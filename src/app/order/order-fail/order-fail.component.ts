import { Component, OnInit } from '@angular/core';
import{faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-fail',
  templateUrl: './order-fail.component.html',
  styleUrls: ['./order-fail.component.css']
})
export class OrderFailComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
