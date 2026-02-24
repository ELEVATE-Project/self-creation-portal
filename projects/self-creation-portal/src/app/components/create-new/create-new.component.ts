import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ArrayContainsAllDirective, CommentsBoxComponent, FormService, SOLUTION_LIST} from 'lib-shared-modules';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatCardModule, TranslateModule,CommentsBoxComponent,CommonModule, ArrayContainsAllDirective],
  templateUrl: './create-new.component.html',
  styleUrl: './create-new.component.scss'
})
export class CreateNewComponent {
  resourceList : any;
  permissions:any = [];

  constructor(private router:Router,private formService:FormService) {
  }

  ngOnInit() {
    this.getsolutionList()
  }

 onCardClick(cardItem: any) {
    this.router.navigate([cardItem.url],{queryParams:{parent:"create"}})
  }

  getsolutionList() {
    this.formService.getPermissions().subscribe((res:any) => {
      this.permissions = res.result;
      localStorage.setItem("permission",JSON.stringify(this.permissions));
      this.formService.getForm(SOLUTION_LIST).subscribe((form) =>{
        this.resourceList = form?.result?.data?.fields?.controls
        // this.resourceList = this.formService.checkPermissions(this.resourceList,res.result)
        let userRoles:any = localStorage.getItem('user_roles')
        userRoles = JSON.parse(userRoles)
        if (this.permissions.find((permission:any) => permission.module == 'reviews' && permission.request_type.includes('POST')) && !this.permissions.find((permission:any) => permission.module == 'projects' && permission.request_type.includes('POST')) && !this.permissions.find((permission:any) => permission.module == 'programs' && permission.request_type.includes('POST'))) {
          this.router.navigate(['/home/up-for-review'])
        }
        else if (this.permissions.find((permission:any) => permission.module == 'rollouts' && permission.request_type.includes('POST')) && !this.permissions.find((permission:any) => permission.module == 'projects' && permission.request_type.includes('POST')) && !this.permissions.find((permission:any) => permission.module == 'programs' && permission.request_type.includes('POST'))){
          this.router.navigate(['/home/roll-out'])
        }
        else {
          this.router.navigate(['/home/create-new'])
        }
      })
    })
  }

}
