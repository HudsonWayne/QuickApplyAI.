import requests
from bs4 import BeautifulSoup

def scrape_jobs(keyword="developer", location=""):
    """
    Scrape jobs from VacancyMail (for demo purposes).
    Replace with real job boards later if needed.
    """
    jobs = []

    # Example job board page
    url = f"https://www.vacancymail.co.zw/jobs/?q={keyword}&l={location}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print("Failed to fetch jobs. Status code:", response.status_code)
            return jobs

        soup = BeautifulSoup(response.text, "html.parser")
        listings = soup.find_all("a", class_="job-listing")  # Adjust if structure changes

        for job in listings:
            title = job.find("h2").text.strip() if job.find("h2") else "No title"
            company = job.find("span", class_="company").text.strip() if job.find("span", class_="company") else "Unknown"
            link = job.get("href")

            jobs.append({
                "title": title,
                "company": company,
                "link": link
            })

    except Exception as e:
        print("Error scraping jobs:", e)

    return jobs


def match_jobs(cv_skills, jobs):
    """
    Match scraped jobs to CV skills.
    Simple matching: if job title contains any skill, consider it relevant.
    """
    matched_jobs = []
    for job in jobs:
        job_text = job["title"].lower()
        if any(skill.lower() in job_text for skill in cv_skills):
            matched_jobs.append(job)
    return matched_jobs


if __name__ == "__main__":
    # Example usage
    cv_skills = ["python", "developer", "engineer"]
    scraped_jobs = scrape_jobs("developer")

    if scraped_jobs:
        print(f"\nFound {len(scraped_jobs)} jobs.")
        matched = match_jobs(cv_skills, scraped_jobs)

        print("\nMatched Jobs:")
        for job in matched:
            print(f"- {job['title']} at {job['company']} ({job['link']})")
    else:
        print("No jobs found.")
