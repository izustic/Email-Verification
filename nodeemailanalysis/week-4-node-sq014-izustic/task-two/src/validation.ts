/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */

import fs from 'fs';
import * as EmailValidator from 'email-validator';
import * as domainValidator from 'email-domain-validator';

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const allEmail = fs.readFileSync(inputPath[0], 'UTF-8');
  const title = allEmail.split('\n').shift();
  const emails = allEmail.trim().split('\n').slice(1);
  const validEmail = emails.filter((email) => {
    return EmailValidator.validate(email);
  });

  const validEmails = validEmail.map((email) => {
    return (domainValidator.validate(email))

  })

  const resolvedValidEmails = await Promise.all(validEmails)

  const validDomainFilter = resolvedValidEmails.map((email:any, index:number) => {
    if (email.isValidDomain){
      return validEmail[index]
    }
  }).filter(email => email !== undefined)

  const output = [title].concat(validDomainFilter).join('\n');
  fs.writeFileSync(outputFile, output);
}


validateEmailAddresses(
  ['./fixtures/inputs/small-sample.csv'],
  'report-validation.csv',
);

export default validateEmailAddresses;
