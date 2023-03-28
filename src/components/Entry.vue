<template v-if="renderComponent">
    <div class="card mb-4 border-0">
        <div class="card-header py-0 pt-1 gradient d-flex justify-content-between align-items-baseline">
            <h5 class="text-light">{{ entry.getName() }}</h5>
            <i id="editIcon" data-bs-toggle="modal" :data-bs-target="'#editModal' + entry.getUuid()" @click="fillData()"
                class="fa-regular fa-pen-to-square text-secondary cursor-pointer text-light"></i>
        </div>

        <div class="card-body dark text-light">

            <div class="row">

                <div class="col-sm-6 row" v-if="entry.getUsername()">
                    <label class="col-sm-4 col-form-label col-form-label-sm">Usuario</label>
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="email" class="form-control form-control-sm" disabled="true"
                                :value="entry.getUsername()">
                            <div class="input-group-text">
                                <i class="fa-regular fa-clipboard"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6 row" v-if="entry.getPassword()">
                    <label class="col-sm-4 col-form-label col-form-label-sm">Password</label>
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input :type="entry.getVisible() ? 'text' : 'password'" class="form-control form-control-sm"
                                disabled="true" :value="entry.getPassword()">
                            <div class="input-group-text">
                                <i class="fa-regular fa-clipboard"></i>
                            </div>
                            <div class="input-group-text" :class="entry.getVisible() ? 'active' : ''"
                                @click="toggleVisible()">
                                <i class="fa-sharp fa-solid fa-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row mt-3" v-if="entry.getDetails()">
                <div>
                    <span data-bs-toggle="collapse" :data-bs-target="'#collapse' + entry.getUuid()" aria-expanded="false"
                        aria-controls="collapseExample">
                        <span class="cursor-pointer">
                            <i class="fa-solid fa-circle-info me-1"></i>
                            Observaciones
                        </span>
                    </span>
                    <div class="collapse mt-2" :id='"collapse" + entry.getUuid()'>
                        <div class="card card-body dark text-light">
                            {{ entry.getDetails() }}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>


    <!-- Modal Editar -->
    <div class="modal fade" :id="'editModal' + entry.getUuid()" tabindex="-1" aria-labelledby="editModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content dark-bg">
                <div class="modal-header py-2 bg-secondary text-light d-flex justify-content-center">
                    <h1 class="modal-title fs-5" id="editModal">Editar entrada</h1>
                </div>
                <div class="modal-body">

                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <input type="email" v-model="editEntryCommand.name"
                                class="form-control form-control-sm" id="colFormLabelSm" placeholder="Nombre">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <input type="email" v-model="editEntryCommand.username" class="form-control form-control-sm"
                                id="colFormLabelSm" placeholder="Usuario">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div class="input-group">
                                <input :type="editPasswordVisible ? 'text' : 'password'"
                                    v-model="editEntryCommand.password" class="form-control form-control-sm"
                                    id="colFormLabelSm" placeholder="Password">
                                <div class="input-group-text" @click="editRandomPassword()">
                                    <i class="fa-solid fa-dice"></i>
                                </div>
                                <div class="input-group-text" :class="editPasswordVisible ? 'active' : ''"
                                    @click="toggleEditVisible()">
                                    <i class="fa-sharp fa-solid fa-eye"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <textarea v-model="editEntryCommand.observaciones" class="form-control form-control-sm"
                                id="exampleFormControlTextarea1" rows="4" placeholder="Observaciones"></textarea>
                        </div>
                    </div>

                </div>

                <div class="d-flex">
                    <div class="w-100">
                        <button type="button" class="btn btn-outline-danger ms-3" data-bs-dismiss="modal"
                            @click="deleteEntry()">Eliminar</button>
                    </div>
                    <div class="mb-2 d-flex justify-content-end pe-3">
                        <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" @click="update()"
                            :disabled="isDisabled()">Aceptar</button>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>


<script lang="ts">

import EditEntryCommand from '@/model/EditEntryCommand';
import EntryType from '@/model/EntryType';
import PasswordGenerator from '@/PasswordGenerator';
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        entry: EntryType
    },
    emits: ['onDeleteEntry', 'onUpdateEntry', 'onRefresh'],
    components: {
        PasswordGenerator
    }
})
export default class Entry extends Vue {

    entry!: EntryType;
    renderComponent: boolean = true;
    editEntryCommand: EditEntryCommand = new EditEntryCommand('', '', '', '', -1);
    editPasswordVisible: boolean = false;

    fillData() {
        this.editEntryCommand = new EditEntryCommand(this.entry.getName(), this.entry.getUsername(),
            this.entry.getPassword(), this.entry.getDetails(),
            this.entry.getUuid())
    }

    async toggleVisible() {
        this.entry.toggleVisible();
        this.$emit('onRefresh')
    }

    toggleEditVisible() {
        this.editPasswordVisible = !this.editPasswordVisible;
    }

    editRandomPassword() {
        this.editEntryCommand.password = PasswordGenerator.newPassword();
    }

    isDisabled = (): boolean => {
        if (this.editEntryCommand.name == '') { return true; }
        return false;
    }

    deleteEntry() {
        this.$emit('onDeleteEntry', this.entry.getUuid());
    }

    update() {
        this.$emit('onUpdateEntry', this.editEntryCommand);
    }

}

</script>

<style scoped>

.gradient {
    background: rgb(28,57,60);
}

.dark {
    background-color: #384848;
}


.search-input {
  background-color: #244e54 !important;
  border: none;
  border-bottom: 1px solid #0DB8DE;
  border-top: 0px;
  border-radius: 0px;
  outline: 0;
  padding-left: 5px;
  color: #ECF0F5;
}

input {
    background-color: #1A2226 !important;
    border: none;
    border-bottom: 0.5px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    outline: 0;
    padding-left: 0px;
    color: #ECF0F5 !important;
}

input[disabled] {
    background-color: #384848 !important;
    border: none;
    border-bottom: 0.5px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    outline: 0;
    padding-left: 0px;
    color: #ECF0F5 !important;
}

textarea {
  background-color: #1A2226 !important;
    border: none;
    border-bottom: 0.5px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    outline: 0;
    padding-left: 5px;
    color: #ECF0F5 !important;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-secondary {
    border-color: #909495;
    color: #909495;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-danger {
    border-color: #e15a42;
    color: #e15a42;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}


</style>