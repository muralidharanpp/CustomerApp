
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `<h1>Customer Entry Form - Angular 20</h1>`
// })
// export class AppComponent {}


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}