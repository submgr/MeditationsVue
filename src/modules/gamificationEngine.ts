// Utility Functions
const getCurrentTimestamp = () => new Date().getTime();
const isTaskExpired = (task) => getCurrentTimestamp() > new Date(task.endDate).getTime();

// Date Time format used: ISO 8601 format!

type Task = {
    id: string;
    title: string,
    description: string,
    metric: string;
    startDate: string;
    endDate: string;
    goal: number;
    progress?: number;
    completed?: boolean;
};

class AchievementsSystem {
    private storageKey: string;
    private tasks: Task[];

    constructor(storageKey: string) {
        this.storageKey = storageKey;
        this.tasks = [];
        this.loadTasks();
    }

    loadTasks() {
        const tasksJson = localStorage.getItem(this.storageKey);
        this.tasks = tasksJson ? JSON.parse(tasksJson) : [];
        this.cleanupExpiredTasks();
    }

    saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    cleanupExpiredTasks() {
        this.tasks = this.tasks.filter(task => !isTaskExpired(task));
        this.saveTasks();
    }

    addTask(task) {
        if (!task.id || !task.metric || !task.startDate || !task.endDate) {
            throw new Error('Task must have an id, metric, startDate, and endDate.');
        }
        if(this.tasks.find((o) => o.id === task.id)){
            // not gonna add it! there is another task with the same id which exists already
        }else{
            this.tasks.push(task);
            this.saveTasks();
        }
        
    }

    recordEvent(metric, quantity = 1) {
        this.tasks.forEach(task => {
            if (task.metric === metric && !isTaskExpired(task)) {
                task.progress = (task.progress || 0) + quantity;
                // Here you can implement additional logic to check if the task is completed.
                // For example: if (task.progress >= task.goal) { task.completed = true; }
            }
        });
        this.saveTasks();
    }

    getTasks() {
        return this.tasks;
    }
}

// Export Functions
// These are the functions you would use to interact with the achievements system in your app.
export function createAchievementsSystem(storageKey) {
    return new AchievementsSystem(storageKey);
}

export function addNewTask(achievementsSystem, task) {
    achievementsSystem.addTask(task);
}

export function recordUserEvent(achievementsSystem, metric, quantity) {
    achievementsSystem.recordEvent(metric, quantity);
}

export function getActiveTasks(achievementsSystem) {
    return achievementsSystem.getTasks().filter(task => !task.completed);
}

// Usage example
const achievementsSystem = createAchievementsSystem('userAchievements');

// // Adding a task example
addNewTask(achievementsSystem, {
     id: 'firstMeditationForFreePremium',
     metric: 'meditationsplayed',
     title: "Медитация",
     description: "Попробуйте первую медитацию и получите подарок: Premium на год",
     startDate: '2023-01-01T00:00:00Z',
     endDate: '2029-12-31T23:59:59Z',
     goal: 1, // The user needs to complete 30 sleep meditations
     progress: 0,
     completed: false
 });

// // Recording an event example
// recordUserEvent(achievementsSystem, 'meditationsplayed_sleepmeditations', 1);

// // Getting active tasks example
// const activeTasks = getActiveTasks(achievementsSystem);
// console.log(activeTasks);