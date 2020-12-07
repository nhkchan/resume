import { Component, OnInit } from '@angular/core';
import { WelcomeService } from 'src/app/services/welcome.service';
import { AwsResponse } from 'src/app/models/aws-response';
import { KennethCootaucoInfoResponse } from 'src/app/models/kenneth-cootauco-info-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private siteInfoResp: KennethCootaucoInfoResponse;

  constructor(private welcomeService: WelcomeService) { }

  ngOnInit() {
    this.siteInfoResp = new KennethCootaucoInfoResponse();
    this.welcomeService.getSiteInformation().subscribe(
      (info: KennethCootaucoInfoResponse) => {
        this.siteInfoResp.availableForHire = info.availableForHire ? true : false;
        this.siteInfoResp.siteVersion = info.siteVersion;
        this.siteInfoResp.welcomeText = info.welcomeText;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  getWelcomeText(): string {
    return this.siteInfoResp == null ? '' : this.siteInfoResp.welcomeText;
  }

}
