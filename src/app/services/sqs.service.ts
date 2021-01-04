import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { NhkMail } from '../models/nhk-mail-req.class';

@Injectable({
  providedIn: 'root'
})
export class SqsService {

  sqs: AWS.SQS;
  sqsReq: AWS.SQS.SendMessageRequest;
  awsCreds: AWS.Credentials;

  constructor() {
    let options = {
      accessKeyId: 'AKIAIP5N4PDR4MDTSF7Q',
      secretAccessKey: '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'
    }; 
    this.awsCreds = new AWS.Credentials(options);
    this.sqs = new AWS.SQS({apiVersion: '2012-11-05', region: 'us-east-1', credentials: this.awsCreds});
  }

  sendMail(req: NhkMail) {
    let s: AWS.SQS.SendMessageRequest = {}  as AWS.SQS.SendMessageRequest;
    s.QueueUrl = 'https://sqs.us-east-1.amazonaws.com/235793719583/nhkchan-mailer';
    s.MessageBody = JSON.stringify(req);
    this.sqs.sendMessage(s, send => {
      console.log(send);
    })
  }

}
