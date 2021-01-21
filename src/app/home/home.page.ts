import {DatosService} from '../services/servicioDatos/datos.service';
import {CopiaService} from '../services/serviceCopiaBD/copia.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    private _horas: Array<any>;

    constructor(private copiaService: CopiaService, private datosService: DatosService) {
    }

    ngOnInit(): void {

    }

    copia() {
        this.copiaService.copiarBBDD()
            .then((resp) => {
                alert(resp);
            })
            .catch((err) => {
                alert(err);
            });
    }

    abrir() {
        this.datosService.openDB()
            .then((resp) => {
                alert(resp);
            })
            .catch((err) => {
                alert(err);
            });
    }

    getHoras() {
        this._horas = [];
        this.datosService.getHoras()
            .then((data) => {
                this._horas = data;
                console.log(this._horas);
            })
            .catch((e) => alert(e));

    }

    get horas(): Array<any> {
        return this._horas;
    }
}
