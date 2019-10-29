import { Component, OnInit } from '@angular/core';
import {Hero} from '../../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];

  constructor(private heroService: HeroService) {



  }
  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(Hero => Hero!=hero)
    this.heroService.deleteHero(hero).subscribe();

  }

  add(name:string):void{
    name = name.trim();
    this.heroService.addHero({name} as Hero).
    subscribe(hero=>
      this.heroes.push(hero))
  }

  getHeroes(): void {
     this.heroService.getHeroes().subscribe(heroes => this.heroes=heroes );
  }

  

selectedHero:Hero=null;

onSelect(hero:Hero):void{

  this.selectedHero = hero;
}


  ngOnInit() {
    this.getHeroes();
  }

}
