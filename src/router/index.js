import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/first-exercise',
        name: 'FirstExercise',
        component: () => import('../views/FirstExercise.vue'),
    },
    {
        path: '/second-exercise',
        name: 'SecondExercise',
        component: () => import('../views/SecondExercise.vue'),
    },
    {
        path: '/third-exercise',
        name: 'ThirdExercise',
        component: () => import('../views/ThirdExercise.vue'),
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
