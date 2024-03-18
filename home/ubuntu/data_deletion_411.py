import random
import time
from playwright.sync_api import sync_playwright

def random_sleep(min, max):
    time.sleep(random.uniform(min, max))

def run(playwright):
    browser = playwright.chromium.launch(headless=True)  # Launch browser in headless mode
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Navigate to the local development Absolute People Search opt-out page
    print("Navigating to the local development Absolute People Search opt-out page...")
    page.goto("http://localhost:8000/absolutepeoplesearch_optout.html", timeout=60000)
    print("Local development Absolute People Search opt-out page loaded.")

    # Check for and accept the cookie consent modal if it exists
    cookie_consent_selector = 'button[title="Accept cookies"]'
    try:
        print("Checking for cookie consent modal...")
        page.wait_for_selector(cookie_consent_selector, state='visible', timeout=5000)
        page.click(cookie_consent_selector)
        print("Cookie consent accepted.")
    except Exception as e:
        print(f"No cookie consent modal found or error accepting cookies: {e}")

    # Function to wait for an element and interact with it
    def wait_and_interact(selector, action, value=None, retries=3):
        for attempt in range(retries):
            try:
                print(f"Attempt {attempt+1}: Waiting for {selector}...")
                page.wait_for_selector(selector, state='visible', timeout=20000)
                if page.is_enabled(selector):
                    if action == 'fill':
                        page.fill(selector, value)
                        print(f"{selector} filled with {value}.")
                    elif action == 'click':
                        page.click(selector)
                        print(f"{selector} clicked.")
                    return
                else:
                    raise Exception(f"{selector} is not enabled.")
            except Exception as e:
                print(f"Attempt {attempt+1}: Error interacting with {selector}: {e}")
                if attempt < retries - 1:
                    print("Retrying...")
                else:
                    raise

    # Wait for the email input field to be available and fill it
    email_input_selector = 'input[devin-id="0"]'  # Selector for the email input
    wait_and_interact(email_input_selector, 'fill', 'mood.coach.job@cloak.id')

    # Wait for the submit button to be available and click it
    submit_button_selector = 'button[devin-id="1"]'  # Selector for the submit button
    wait_and_interact(submit_button_selector, 'click')

    # Listen for console events and log any JavaScript errors
    def log_console_messages(msg):
        if msg.type() == "error":
            print(f"Console error: {msg.text}")
    page.on('console', log_console_messages)

    # Close page
    print("Closing the page...")
    page.close()

    # Close browser
    print("Closing the browser...")
    browser.close()

print("Starting the script...")
with sync_playwright() as playwright:
    run(playwright)
