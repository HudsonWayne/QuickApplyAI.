// backend/routes/jobs.js
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get("https://vacancymail.co.zw/jobs/");
    const $ = cheerio.load(data);

    const jobs = [];
    $("a.job-listing").each((i, el) => {
      jobs.push({
        title: $(el).find(".job-title").text().trim(),
        company: $(el).find(".job-company").text().trim(),
        location: $(el).find(".job-location").text().trim(),
        link: "https://vacancymail.co.zw" + $(el).attr("href"),
      });
    });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

export default router;
