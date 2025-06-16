import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-popup-role-add-edit',
  templateUrl: './popup-role-add-edit.component.html',
  styleUrls: ['./popup-role-add-edit.component.css']
})
export class PopupRoleAddEditComponent implements OnInit {
  roleForm: FormGroup;
  submitted = false;
  idRole
  @Output() roleSaved: EventEmitter<any> = new EventEmitter<any>();

      allRoles = ['Admin','Editeur','Redacteur','Lecteur']
      allPermissions =  [  
      'Créer un article',
      'Modifier tous les articles',
      'Modifier ses propres articles',
      'Supprimer un article'
    ];

  constructor(public modal: NgbActiveModal,
              private fb: FormBuilder,
              private roleService :RoleService,
              public iziToast: Ng2IzitoastService) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      permissions: ['', [Validators.required]],
    });
    if (this.idRole) {
      this.roleService.getRoleById(this.idRole).subscribe({
        next: (role) => {
          this.roleForm.patchValue({
            name: role.name,
            permissions: role.permissions || []
          });
        },
        error: (err) => {
          console.error('Erreur chargement rôle', err);
        }
      });
    }
  }

  get f() {
    return this.roleForm.controls;
  }

    onSubmit() {
      this.submitted = true;
      if (this.roleForm.invalid) return;

      const roleData = {
        name: this.roleForm.value.name,
        permissions: this.roleForm.value.permissions,
      };

      if (this.idRole) {
        this.roleService.editRole(this.idRole, roleData).subscribe({
          next: (response) => {
            this.roleSaved.emit(roleData);
            this.modal.close(roleData);
            this.iziToast.success({
              message: 'Rôle modifié avec succès',
              position: 'topRight'
            });
          },
          error: (error) => {
            if (error.error?.message === 'Role already exists') {
              this.iziToast.error({
                message: 'Un rôle avec ce nom existe déjà.',
                position: 'topRight'
              });
            this.onCancel()
            } else {
              this.iziToast.error({
                message: 'Erreur lors de la modification du rôle.',
                position: 'topRight'
              });
            }
          }
        });
      } else {
        this.roleService.createRole(roleData).subscribe({
          next: (response) => {
            this.roleSaved.emit(roleData);
            this.modal.close(roleData);
            this.iziToast.success({
              message: 'Rôle créé avec succès',
              position: 'topRight'
            });
          },
          error: (error) => {
            if (error.error?.message === 'Role already exists') {
              this.iziToast.error({
                message: 'Ce rôle existe déjà. Veuillez choisir un autre nom.',
                position: 'topRight'
              });
              this.onCancel()
            } else {
              this.iziToast.error({
                message: 'Erreur lors de la création du rôle.',
                position: 'topRight'
              });
            }
          }
        });
      }
    }


  onCancel() {
    this.modal.dismiss();
  }
}


