import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=251';


  pokemonList = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  catchAll(limit: number = 151, offset: number = 0) {
    const customUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    this.http.get<any>(customUrl).subscribe(res => {
      const pokemonCompleto = res.results.map((p: any) => {

        // Extrai o ID da URL: "https://pokeapi.co/api/v2/pokemon/152/" -> "152"
        const parts = p.url.split('/');
        const id = parts[parts.length - 2];

        return {
          ...p,
          id: id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
      });
      this.pokemonList.set(pokemonCompleto);
    });
  }
}