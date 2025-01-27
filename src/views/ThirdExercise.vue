<template>
  <div class="container">
    <h1 class="title">Exercice 3</h1>
    <p class="description">Afficher la liste des posts de l'api de mock https://jsonplaceholder.typicode.com/. Ajouter un formulaire de création et les appels API correspondant pour un post. Ajouter une zone affichant le détail d'un post lorsqu'on le sélectionne dans la liste. Ajouter la possibilité de mettre à jour les champs modifiables d'un post. Ajouter la possibilité de supprimer un post.</p>
    <form @submit.prevent="handleSubmit" class="form">
      <input v-model="newPost.title" placeholder="Titre" required />
      <textarea v-model="newPost.body" placeholder="Contenu" required></textarea>
      <button type="submit">Ajouter un post</button>
    </form>
    <div class="content">
      <ul>
        <li v-for="post in postStore.posts" :key="post.id" :class="{ 'selected-post': selectedPost?.id === post.id }">
          <div v-if="editingPostId === post.id">
            <input v-model="editTitle" placeholder="Modifier le titre" />
            <textarea v-model="editBody" placeholder="Modifier le contenu"></textarea>
            <button @click="saveEdit(post.id)">Enregistrer</button>
            <button @click="cancelEdit">Annuler</button>
          </div>
          <div v-else @click="selectPost(post)">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <button @click.stop="startEdit(post)">Modifier</button>
            <button @click.stop="deletePost(post.id)">Supprimer</button>
          </div>
        </li>
      </ul>
      <div v-if="selectedPost" class="post-details">
        <h2>Détails du post</h2>
        <h3>{{ selectedPost.title }}</h3>
        <p>{{ selectedPost.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePostStore } from '../stores/PostStore';
import { Post } from '../models/Post';

const postStore = usePostStore();
const newPost = ref({ title: '', body: '' });
const selectedPost = ref<Post | null>(null);
const editingPostId = ref<number | null>(null);
const editTitle = ref('');
const editBody = ref('');

const handleSubmit = async () => {
  await postStore.addPost(newPost.value);
  newPost.value = { title: '', body: '' };
};

const selectPost = (post: Post) => {
  selectedPost.value = post;
};

const startEdit = (post: Post) => {
  editingPostId.value = post.id;
  editTitle.value = post.title;
  editBody.value = post.body;
};

const saveEdit = async (id: number) => {
  await postStore.editPost(id, { title: editTitle.value, body: editBody.value });
  editingPostId.value = null;
};

const cancelEdit = () => {
  editingPostId.value = null;
};

const deletePost = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
    await postStore.removePost(id);
    if (selectedPost.value?.id === id) {
      selectedPost.value = null;
    }
  }
};

onMounted(() => {
  postStore.loadPosts();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2em;
  font-weight: bold;
}

.description {
  font-size: 1em;
  font-weight: normal;
  text-align: center;
}

.form {
  width: 100%;
  margin-bottom: 1rem;
}

.content {
  display: flex;
  gap: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

li:hover {
  background-color: #f0f0f0;
}

.selected-post {
  background-color: #e0f7fa;
}

.post-details {
  position: sticky;
  top: 20px;
  width: 33%;
  height: fit-content;
  flex-shrink: 0;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input, textarea {
  width: 100%;
  margin-bottom: 0.5rem;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
