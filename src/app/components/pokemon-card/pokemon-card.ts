import { Component, input, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard implements OnInit{
  private http = inject(HttpClient)

  pokemonBase = input.required<any>();

  details = signal<any>(null);

  ngOnInit(): void {
    this.http.get<any>(this.pokemonBase().url).subscribe(res =>{
      this.details.set(res)
    })
  }

}
