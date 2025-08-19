import requests
from bs4 import BeautifulSoup

def scrape_jobs(keyword="developer", location=""):
    """
    Scrape simple jobs from a sample website (for demo purposes).
    Replace with real job boards later.
    """
    jobs = []

    # Example: scrape from a simple job board page (replace URL with real one)
    url = f"https://www.vacancymail.co.zw/jobs/?q={keyword}&l={location}"
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return jobs

        soup = BeautifulSoup(response.text, "html.parser")
        listings = soup.find_all("a", class_="job-listing")  # example selector

        for job in listings:
            title = job.find("h2").text if job.find("h2") else "No title"
            company = job.find("span", class_="company").text if job.find("span", class_="company") else "Unknown"
            link = job.get("href")
            jobs.append({
                "title": title,
                "company": company,
                "link": link
            })
    except Exception as e:
        print("Error scraping jobs:", e)

    return jobs
