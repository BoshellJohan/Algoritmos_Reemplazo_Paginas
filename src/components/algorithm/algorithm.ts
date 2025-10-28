import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Algorithms } from '../../services/algorithms';
import { Process } from '../../services/process';

@Component({
  selector: 'app-algorithm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './algorithm.html',
  styleUrl: './algorithm.css'
})

export class AlgorithmChart implements OnInit{
  cantidadFallos:number = 0;
  message:string = ""
  showMessage:boolean = false;

  constructor(public algorithms:Algorithms,
              public processService:Process,
  ){}

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
  @Output() updateProcessesEvent = new EventEmitter<any>();

  array:any = [];
  bitArray:any = [];
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
    this.bitArray = this.algorithms.bitArray(this._processes, this._cantidadMarcos);
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

  activeMessage(message:string){
    this.showMessage = true;
    this.message = message;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000)
  }

  editPage(page_id:number){
    this.processService.getProcessByID(page_id, this._processes)
    .then(res_process => {
      if (res_process) {
        res_process['edit'] = true;
      } else {
        console.log('No se encontró el proceso');
      }
    });
  }

  updatePage(page_id:number){
    this.processService.getProcessByID(page_id, this._processes)
    .then(res_process => {
      if (res_process) {
        if(Number(res_process['number']) >= 0){
          res_process['number'] = Number(res_process['number']);
          res_process['edit'] = false;
          this.recalculate();
          this.updateProcessesEvent.emit(this._processes);
        } else {
          this.activeMessage("Ingresa un número mayor que cero.");
        }

      } else {
        console.log('No se encontró el proceso');
      }
    });
  }

  deleteProcess(process_id:number){
    console.log(process_id)
    this.processService.deleteProcess(process_id, this._processes)
    .then((res_process:any) => {
      if (res_process) {
        this._processes = res_process;
        this.recalculate();
        this.updateProcessesEvent.emit(this._processes);
      } else {
        console.log('No se encontró el proceso');
      }
    });
  }
}
