import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { RoleService } from 'src/app/_services/role.service';
import { PopupRoleAddEditComponent } from 'src/app/modals/popup-role-add-edit/popup-role-add-edit.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles = [];
  roleTodeleted :any
  constructor(private modalService: NgbModal,
              private roleService :RoleService,
              public iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des rôles :', error);
      }
    });
  }
    
  addRole() {
    const modalRef = this.modalService.open(PopupRoleAddEditComponent);
    modalRef.componentInstance.roleSaved.subscribe(() => {
      this.getRoles();  // Actualiser la liste
    });
  }

  editRole(role) {
    const modalRef = this.modalService.open(PopupRoleAddEditComponent);
    modalRef.componentInstance.idRole = role._id;
    modalRef.componentInstance.roleSaved.subscribe((roleData) => {
      this.getRoles();
    });
  }
  getRoleToDeleted(role: any) {
    this.roleTodeleted = role
  }
  deleteRole() {
    this.roleService.deleteRole(this.roleTodeleted._id).subscribe({
      next: () => {
        this.iziToast.success({
              message: 'Rôle supprimé avec succès !',
              position: 'topRight'
            });
    },
      error: (err) => {
        this.iziToast.error({
                message: 'Erreur lors de la suppression du rôle.',
                position: 'topRight'
              });
    }
    });
  }


}
