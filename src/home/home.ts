import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../components-shared/card/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {}
