
import { Component, OnInit } from '@angular/core';
import { AlgorithmChart } from '../algorithm/algorithm'
import { FormsModule } from '@angular/forms';

import { Process } from '../../services/process';
import { Algorithms } from '../../services/algorithms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AlgorithmChart, FormsModule],
  templateUrl: './main.html',
  styleUrls: ['./styles/form.css', './styles/process.css', './styles/algorithm.css']
})
export class Main implements OnInit {
  maxCapacity = 20;
  newCantidadMarcos:number = 3;
  cantidadMarcos:number = 3;
  private nextId:number = 0;

  //Algorithms
  showFIFOAlgorithm:boolean = true;
  showBITAlgorithm:boolean = true;
  showLRUAlgorithm:boolean = true;

  //Message
  message:string = ""
  showMessage:boolean = false;

  newProcess = {
    "id": this.nextId,
    "number": 0,
    "edit": false,
  }

  processesActives: { id: number; number: number; edit:boolean}[] = [];

  constructor(public processService:Process, public algorithmService:Algorithms){};

  activeMessage(message:string){
    this.showMessage = true;
    this.message = message;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000)
  }



  editProcess(process_id:number){
    this.processService.getProcessByID(process_id, this.processesActives)
    .then(res_process => {
      if (res_process) {
        console.log('Proceso encontrado:', res_process);
        res_process['edit'] = true;
      } else {
        console.log('No se encontró el proceso');
      }
    });
  }

  updateProcess(process_id:number){
    this.processService.getProcessByID(process_id, this.processesActives)
    .then(res_process => {
      if (res_process) {
        // console.log('Proceso actualizado:', res_process);
        res_process['edit'] = false;
      } else {
        console.log('No se encontró el proceso');
      }
    });
  }

  addProcess() {
    // Genera un ID único
    this.nextId = this.processesActives.length + 1
    const processToAdd = {
      ...this.newProcess,
      id: this.nextId++
    };

    if(this.processService.isValidProcess(processToAdd)){
      this.processesActives.push(processToAdd);
      this.processesActives = [...this.processesActives];

      // Resetea el formulario
      this.newProcess = {
        id: this.nextId,
        number: 0,
        edit: false
      };

      this.activeMessage("Se ha añadido un nuevo proceso.");

    } else {
      this.activeMessage("Añade un número válido.");
    }
  }

  deleteProcess(process_id:number){
    this.processService.deleteProcess(process_id, this.processesActives)
    .then((res_process:any) => {
      if (res_process) {
        this.processesActives = res_process;
      } else {
        console.log('No se encontró el proceso');
      }
    });
  }

  updateCantidadMarcos(){
    if(this.newCantidadMarcos > 1){
      this.cantidadMarcos = this.newCantidadMarcos;
      this.activeMessage("Cantidad de marcos actualizada.");
    } else {
      this.activeMessage("Ingresa un valor igual o mayor a 2.")
    }
  }

  verifyFIFO(){
    if(this.processesActives.length == 0){
      this.activeMessage('Add a new process to continue')
      this.showFIFOAlgorithm = false;
    }
  }

  verifyLRU(){
    if(this.processesActives.length == 0){
      this.activeMessage('Add a new process to continue')
      this.showLRUAlgorithm = false;
    }
  }

  verifyBIT(){
    if(this.processesActives.length == 0){
      this.activeMessage('Add a new process to continue')
      this.showBITAlgorithm = false;
    }
  }

  toggleFIFOAlgorithm(){
    this.showFIFOAlgorithm = !this.showFIFOAlgorithm;
    if(this.showFIFOAlgorithm){
      this.verifyFIFO();
    }
  }

  toggleLRUAlgorithm(){
    this.showLRUAlgorithm = !this.showLRUAlgorithm;
    if(this.showLRUAlgorithm){
      this.verifyLRU();
    }
  }

  toggleBITAlgorithm(){
    this.showBITAlgorithm = !this.showBITAlgorithm;
    if(this.showBITAlgorithm){
      this.verifyBIT();
    }
  }


  ngOnInit(): void {
    this.processesActives.push({
    "id": 0,
    "number": 7,
    "edit": false,
  });

    this.processesActives.push({
    "id": 1,
    "number": 0,
    "edit": false,
  });

  this.processesActives.push({
    "id": 2,
    "number": 1,
    "edit": false,
  });

  this.processesActives.push({
    "id": 3,
    "number": 2,
    "edit": false,
  });

    this.processesActives.push({
    "id": 4,
    "number": 0,
    "edit": false,
  });

  this.processesActives.push({
    "id": 5,
    "number": 3,
    "edit": false,
  });

  this.processesActives.push({
    "id": 6,
    "number": 0,
    "edit": false,
  });

    this.processesActives.push({
    "id": 7,
    "number": 4,
    "edit": false,
  });

  this.processesActives.push({
    "id": 8,
    "number": 2,
    "edit": false,
  });

    this.processesActives.push({
    "id": 9,
    "number": 3,
    "edit": false,
  });

  this.processesActives.push({
    "id": 10,
    "number": 0,
    "edit": false,
  });

    this.processesActives.push({
    "id": 11,
    "number": 3,
    "edit": false,
  });

  this.processesActives.push({
    "id": 12,
    "number": 2,
    "edit": false,
  });

  this.processesActives.push({
    "id": 13,
    "number": 1,
    "edit": false,
  });

    this.processesActives.push({
    "id": 14,
    "number": 2,
    "edit": false,
  });

  this.processesActives.push({
    "id": 15,
    "number": 0,
    "edit": false,
  });

  this.nextId = this.processesActives.length;
  console.log(this.nextId)
  }

}

