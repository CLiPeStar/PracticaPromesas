import {AppComponent} from '../../app.component';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Request} from '../../core/Request';

@Injectable({
    providedIn: 'root',
})
export class DatosService {
    private db: SQLiteObject;

    constructor(private platform: Platform, private sqlite: SQLite) {
    }

    requestExecuteSentence() {
        return new Promise<void>((resolve, reject) => {
                let consultable = true;
                if (!this.db) {
                    this.openDB()
                        .then((resp) => {
                            alert(resp);
                            resolve();
                        })
                        .catch((err) => {
                            consultable = false;
                            alert(err);
                            reject(err);
                        });
                } else {
                    resolve();
                }

            }
        );
    }

    executeSentence(request: Request) {
        return new Promise<Array<any>>((resolve, reject) => {

                this.requestExecuteSentence()
                    .then(() => {
                        this.db
                            .executeSql(request.sql, request.searchParams)
                            .then((data) => {
                                const responseData: Array<any> = [];
                                for (let i = 0; i < data.rows.length; i++) {
                                    const obj = data.rows.item(i);
                                    responseData.push(obj);
                                }
                                resolve(responseData);

                            })
                            .catch((e) => {
                                reject('fallo al ejecutar sentencia ' + JSON.stringify(e));
                            });
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }
        );
    }

    getHoras() {
        const sql = 'Select descripcion as nombre from horasSemana';
        const searchParams = [];
        const request: Request = new Request(sql, searchParams);

        return new Promise<Array<any>>((resolve, reject) => {
            this.executeSentence(request)
                .then((data) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    getCursos(estudios) {
        const sql =
            'SELECT grupo.idGrupo as id, grupo.nombre FROM grupo INNER JOIN estudios ON grupo.idEstudios = estudios.idEstudios  WHERE estudios.nombre LIKE ?';
        const searchParams = [estudios];
        const request: Request = new Request(sql, searchParams);

        return new Promise((resolve, reject) => {
            this.executeSentence(request)
                .then((data) => resolve(data))
                .catch((e) => reject(e));
        });
    }

    openDB() {
        return new Promise((resolve, reject) => {
            this.platform.ready()
                .then(() => {

                    this.sqlite
                        .create(this.getConector())
                        .then((db: SQLiteObject) => {
                            this.db = db;
                            resolve('Exito al abrir');
                        })
                        .catch(() => {
                            reject('Fallo al obtener conexión');
                        });
                })
                .catch(() => {
                    reject('Error el dispositivo no esta listo');
                });
        });

    }

    private getConector() {
        return {
            name: 'Horario16e.db',
            location: 'default',
            createFromLocation: 1,
        };
    }
}
