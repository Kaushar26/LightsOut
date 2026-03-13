import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {

  drivers:any[] = [];

  constructor(private router:Router){

    // protect dashboard
    if(localStorage.getItem("loggedIn") !== "true"){
      this.router.navigate(['/']);
    }

    this.loadDrivers();

  }

  loadDrivers(){

    fetch("http://localhost:5000/api/drivers")
    .then(res => res.json())
    .then(data => {
      console.log("Drivers loaded:", data);
      this.drivers = data;
    })
    .catch(err => console.error(err));

  }

  logout(){

    localStorage.removeItem("loggedIn");

    this.router.navigate(['/']);

  }

}