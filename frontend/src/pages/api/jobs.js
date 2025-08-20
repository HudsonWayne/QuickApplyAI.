import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { skill } = req.query;

    // Example: scrape from vacancymail.co.zw (replace with real job board)
    const url = "https://vacancymail.co.zw/jobs";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const jobs = [];

    $(".job-listing").each((i, el) => {
      const title = $(el).find(".job-title").text().trim();
      const company = $(el).find(".company").text().trim();
      const link = $(el).find("a").attr("href");

      if (title.toLowerCase().includes(skill.toLowerCase())) {
        jobs.push({ title, company, link });
      }
    });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
