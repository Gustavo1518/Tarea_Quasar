<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input label="Buscar Tarea" filled v-model="TextoB" />
    <q-editor
      v-if="!edicion"
      v-model="editor"
      v-on:keyup.enter="saveWork"
      :definitions="{
        save: {
          tip: 'Guardar Tarea',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['upload', 'save']
      ]"
    />
    <q-editor
      v-else
      v-model="editor"
      v-on:keyup.enter="updateWork"
      :definitions="{
        save: {
          tip: 'Actualizar',
          icon: 'save',
          label: 'Actualizar',
          handler: updateWork
        },
      }"
      :toolbar="[
        ['upload', 'save']
      ]"
    />
    <q-btn flat color="blue" v-if="editor.length > 0" @click="limpiar">limpiar input</q-btn>
    <q-card class="row" flat bordered v-for="(item, index) in tareas" :key="index">
      ´
      <q-card-section class="col" v-html="item.texto" :class="item.estado? 'tachar':
       ''" />
      <q-btn flat color="blue" @click="editar(index, item.id)">Editar</q-btn>
      <q-btn flat color="red" @click="eliminar(index, item.id)">Eliminar</q-btn>
    </q-card>
    <div class="flex flex-center" v-if="tareas.length == 0">
      <h6>Sin Tareas Pendientes Gustavo</h6>
    </div>
  </div>
</template>

<script>
import { db } from "boot/firebase";
import { error } from "util";
export default {
  data() {
    return {
      editor: "",
      tareas: [],
      TextoB: "",
      filtradoB: [],
      edicion: false
    };
  },
  created() {
    this.listartareas();
  },
  methods: {
    async saveWork() {
      if (this.editor == "") {
        this.$q.notify({
          message: "Campos Vacios",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        });
      } else {
        try {
          const DB = await db.collection("Tareas").add({
            texto: this.editor
          });
          this.tareas.push({
            texto: this.editor,
            id: DB.id
          });
          this.$q.notify({
            message: "Tarea Guardada Gustavo",
            color: "green-4",
            textColor: "white",
            icon: "cloud_done"
          });
        } catch (error) {
          console.log(error);
        }
        return (this.editor = "");
      }
    },
    eliminar(index, id) {
      this.$q
        .dialog({
          title: "Cuidado!",
          message: "Desea eliminar la nota?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          db.collection("Tareas")
            .doc(id)
            .delete()
            .then(function() {
              console.log("borrado gustavo");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        });
    },
    updateWork() {
      try {
        db.collection("Tareas")
          .doc(this.id)
          .update({
            texto: this.editor
          });

        this.tareas[this.index].texto = this.editor;
        this.index = null;
        this.edicion = false;
        this.id = null;
        this.editor = "";
        this.$q.notify({
          message: "Tarea actualizada Gustavo!",
          color: "dark",
          textColor: "white",
          icon: "cloud_done"
        });
      } catch (error) {
        this.$q.notify({
          message: error,
          color: "red",
          textColor: "white",
          icon: "clear"
        });
      }
    },
    editar(index, id) {
      this.edicion = true;
      this.editor = this.tareas[index].texto;
      this.index = index;
      this.id = id;
      console.log("editar");
    },
    async listartareas() {
      try {
        const resDB = await db.collection("Tareas").get();
        resDB.forEach(res => {
          const tarea = {
            id: res.id,
            texto: res.data().texto,
            estado: res.data().estado
          };
          this.tareas.push(tarea);
        });
      } catch (error) {
        console.log(error);
      }
    },
    limpiar() {
      return (this.editor = "");
    }
  }
};
</script>
<style>
.tachar {
  text-decoration: line-through;
}
</style>