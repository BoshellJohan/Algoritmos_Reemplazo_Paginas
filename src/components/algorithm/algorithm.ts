import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Algorithms } from '../../services/algorithms';

@Component({
  selector: 'app-algorithm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './algorithm.html',
  styleUrl: './algorithm.css'
})

export class AlgorithmChart implements OnInit{
  cantidadFallos:number = 0;
  constructor(public algorithms:Algorithms){}

  private _processes: { id: number; number: number; edit:boolean }[] = [];
  private _cantidadMarcos:number = 0;

  @Input() set processes(value: { id: number; number: number; edit:boolean }[]) {
    this._processes = value;
    this.recalculate();
  }

  get processes() {
    return this._processes;
  }

  @Input() set cantidadMarcos(value: number) {
    this._cantidadMarcos = value;
    this.recalculate();
  }

  get cantidadMarcos() {
    return this._cantidadMarcos;
  }

  @Input() titleAlgorithm:string = "";
  @Input() maxCapacity:number = 0;

  array:any = [{data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}, {data:[1, 2], result: 'failed'}];
  ngOnInit(): void {
    this.recalculate();
  }

  private recalculate() {
  if (this.titleAlgorithm === 'FIFO') {
    this.array = this.algorithms.FIFO(this._processes, this._cantidadMarcos);
  } else if (this.titleAlgorithm === 'LRU') {
    this.array = this.algorithms.LRU(this._processes, this._cantidadMarcos);
  } else if (this.titleAlgorithm === 'BIT') {
    this.array = this.algorithms.BIT(this._processes, this._cantidadMarcos);
  }

  this.cantidadFallos = 0; // reiniciar antes de contar
  this.calcFails();
}

  calcFails(){
    this.array.forEach((p:any) => {
      if(p.result == 'failed'){
        this.cantidadFallos++;
      }
    })
  }
}
