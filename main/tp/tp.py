from selenium.webdriver import Chrome
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
import time
from pathlib import Path
chrome_options = Options()
chrome_options.add_experimental_option('prefs', {
    "download": {
        # "prompt_for_download": False,
        "download.default_directory"  : '/download',
        # "download.directory_upgrade": True,
        # "safebrowsing.enabled": False,
        # 'profile.default_content_setting_values.automatic_downloads': 2,
    }
    })
browser = Chrome('D://Downloads/chromedriver/chromedriver.exe', chrome_options=chrome_options)
browser.get(url='https://costco97.com/costco-tp-tracker/')

try:
    csv_button = WebDriverWait(browser, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'buttons-csv'))
        )
    csv_button.click()
    print('i pressed the button')
    for i in range(1, 10):
        time.sleep(1)
        print(f'sleeping for {i} seconds')
    print('im done')    
finally:
    browser.close()
