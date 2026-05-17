import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../services/seguridad.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {


  constructor(public seguridadServicio: SeguridadService) {
   }

  ngOnInit(): void {
    
  }

 
}
