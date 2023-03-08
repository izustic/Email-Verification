/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

import fs from 'fs';
import * as EmailValidator from 'email-validator';

function analyseFiles(inputPaths: string[], outputPath: string) {
  const allEmail = fs.readFileSync(inputPaths[0], 'UTF-8');
  const emails = allEmail.trim().split('\n').slice(1);

  const validEmails = emails.filter((email) => {
    return EmailValidator.validate(email) === true;
  });

  const emailDomains = validEmails.map((email) => {
    return email.split('@')[1];
  });

  const category: any = {};
  for (const domain of emailDomains) {
    if (category[domain]) {
      category[domain]++;
    } else {
      category[domain] = 1;
    }
  }

  const domains = Object.keys(category);

  const output = {
    'valid-domains': domains,
    totalEmailsParsed: emails.length,
    totalValidEmails: validEmails.length,
    categories: category,
  };

  const outputData = JSON.stringify(output, null, 1);
  fs.writeFileSync(outputPath, outputData);
}

analyseFiles(
  ['./fixtures/inputs/small-sample.csv'], 
  'report-analysis.json');

export default analyseFiles;
