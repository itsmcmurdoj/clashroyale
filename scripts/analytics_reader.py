#!/usr/bin/env python3
"""
Nexus Royale — Google Analytics 4 Reader
Uses GA4 Data API with service account credentials.
Property ID: G-M9Z694S6GT → Numeric ID needed (see note below)

NOTE: GA4 property ID for the Data API is the numeric ID found in:
  Analytics → Admin → Property Settings → Property ID (e.g., 123456789)
  NOT the "G-XXXXXXXX" measurement ID.
"""

import json, os, sys
from datetime import date, timedelta

CREDENTIALS_PATH = "/Users/jacksonmcmurdo/Desktop/Nexus Royale/ga4_credentials.json"
GA4_PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID", "554924999")

def get_analytics_report(days_back=7):
    """Fetch key metrics for the last N days."""
    import google.auth
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange, Dimension, Metric, RunReportRequest
    )

    creds = None
    if os.path.exists(CREDENTIALS_PATH):
        try:
            from google.oauth2 import service_account
            creds = service_account.Credentials.from_service_account_file(
                CREDENTIALS_PATH,
                scopes=["https://www.googleapis.com/auth/analytics.readonly"]
            )
        except Exception:
            from google.oauth2.credentials import Credentials
            creds = Credentials.from_authorized_user_file(
                CREDENTIALS_PATH,
                scopes=["https://www.googleapis.com/auth/analytics.readonly"]
            )
    else:
        # Fall back to default credentials (ADC)
        creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/analytics.readonly"])

    if not creds:
        print("❌ No valid credentials found.")
        return None

    try:
        client = BetaAnalyticsDataClient(credentials=creds)

        end = date.today()
        start = end - timedelta(days=days_back)

        request = RunReportRequest(
            property=f"properties/{GA4_PROPERTY_ID}",
            dimensions=[
                Dimension(name="pagePath"),
                Dimension(name="deviceCategory"),
                Dimension(name="country"),
            ],
            metrics=[
                Metric(name="activeUsers"),
                Metric(name="sessions"),
                Metric(name="screenPageViews"),
                Metric(name="bounceRate"),
                Metric(name="averageSessionDuration"),
            ],
            date_ranges=[DateRange(
                start_date=start.isoformat(),
                end_date=end.isoformat()
            )],
            limit=20,
        )

        response = client.run_report(request)

        results = {
            "period": f"{start} → {end}",
            "rows": []
        }

        for row in response.rows:
            dims = [d.value for d in row.dimension_values]
            mets = [m.value for m in row.metric_values]
            results["rows"].append({
                "page":     dims[0],
                "device":   dims[1],
                "country":  dims[2],
                "users":    int(mets[0]),
                "sessions": int(mets[1]),
                "pageviews":int(mets[2]),
                "bounce_rate": f"{float(mets[3]):.1%}",
                "avg_session": f"{float(mets[4]):.0f}s",
            })

        return results

    except Exception as e:
        print(f"❌ Analytics API error: {e}")
        return None


def print_summary(days_back=7):
    """Print a human-readable analytics summary."""
    data = get_analytics_report(days_back)
    if not data:
        return

    rows = data["rows"]
    total_users    = sum(r["users"]    for r in rows)
    total_sessions = sum(r["sessions"] for r in rows)
    total_pv       = sum(r["pageviews"] for r in rows)

    mobile = sum(r["users"] for r in rows if r["device"] == "mobile")
    desktop = sum(r["users"] for r in rows if r["device"] == "desktop")

    print(f"\n📊 NEXUS ROYALE ANALYTICS — Last {days_back} Days ({data['period']})")
    print(f"{'─'*50}")
    print(f"  👤 Total Users:     {total_users:,}")
    print(f"  🔄 Sessions:        {total_sessions:,}")
    print(f"  📄 Page Views:      {total_pv:,}")
    print(f"  📱 Mobile Users:    {mobile:,} ({mobile/max(total_users,1):.0%})")
    print(f"  🖥  Desktop Users:   {desktop:,} ({desktop/max(total_users,1):.0%})")

    print(f"\n  Top Pages:")
    pages = {}
    for r in rows:
        pages[r["page"]] = pages.get(r["page"], 0) + r["pageviews"]
    for page, pv in sorted(pages.items(), key=lambda x: -x[1])[:5]:
        print(f"    {page or '/':<30} {pv:>6} views")

    print(f"\n  Top Countries:")
    countries = {}
    for r in rows:
        countries[r["country"]] = countries.get(r["country"], 0) + r["users"]
    for country, users in sorted(countries.items(), key=lambda x: -x[1])[:5]:
        print(f"    {country:<30} {users:>5} users")

    return data


if __name__ == "__main__":
    days = int(sys.argv[1]) if len(sys.argv) > 1 else 7
    print_summary(days)
