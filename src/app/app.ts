import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pokemon } from './service/pokemon';
import { PokemonCard } from './components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PokemonCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private pokemonService = inject(Pokemon);

  searchTerm = signal('');

  filteredPokemons = computed(() => {
    const term = this.searchTerm().toLocaleLowerCase();
    return this.pokemonService.pokemonList().filter(p => {
      return p.name.toLocaleLowerCase().includes(term)
    });
  });

  pokemons = this.pokemonService.pokemonList;

  ngOnInit() {
    this.pokemonService.catchAll();
  }


  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  selecionarRegiao(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const [limit, offset] = selectElement.value.split(',').map(Number);
    this.pokemonService.catchAll(limit, offset);
  }
}
