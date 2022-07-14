import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserAlt, faTimes, faFolderOpen, faCheck, faHistory, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  uuidValue: any;
  userImageBase;
  faUserAlt = faUserAlt;
  faCheck = faCheck;
  faChartBar = faChartBar;
  faTimes = faTimes;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faThList = faThList;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;
  userName: string;

  profileMessages: any;
  messagesStorage: any;
  unreadMessagesArray = [];
  readMessageStatus: boolean = false;
  UserLoggedId;
  constructor( private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService) { }

  ngOnInit(): void {






  
    

  }
  signOut() {
    this.route.navigate(["/admin/login"]);
    localStorage.clear();
  }






}
