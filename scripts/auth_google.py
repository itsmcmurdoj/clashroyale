import json
import os
import sys
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_SECRETS_FILE = "/Users/jacksonmcmurdo/Downloads/client_secret_273305688886-btp02ln82haue56g4ohqne7vquqk6tj1.apps.googleusercontent.com.json"
ADC_DIR = os.path.expanduser("~/.config/gcloud")
ADC_FILE = os.path.join(ADC_DIR, "application_default_credentials.json")
CUSTOM_CRED_FILE = "/Users/jacksonmcmurdo/Desktop/Nexus Royale/ga4_credentials.json"

SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/cloud-platform"
]

def main():
    if not os.path.exists(CLIENT_SECRETS_FILE):
        print(f"File not found: {CLIENT_SECRETS_FILE}")
        return

    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES)
    print("Launching auth flow on local server...")
    # Open local server on port 8080 or random
    creds = flow.run_local_server(port=0, open_browser=True)

    # Save in standard ADC format
    adc_data = {
        "client_id": creds.client_id,
        "client_secret": creds.client_secret,
        "refresh_token": creds.refresh_token,
        "type": "authorized_user"
    }

    os.makedirs(ADC_DIR, exist_ok=True)
    with open(ADC_FILE, "w") as f:
        json.dump(adc_data, f, indent=2)
    print(f"✅ Saved ADC credentials to {ADC_FILE}")

    with open(CUSTOM_CRED_FILE, "w") as f:
        json.dump(adc_data, f, indent=2)
    print(f"✅ Saved copy to {CUSTOM_CRED_FILE}")

if __name__ == "__main__":
    main()
