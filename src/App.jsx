import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import TaskList from "./components/Tasks";
import AddTask from "./components/AddTask";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";

const App = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);

    toast({
      title: "Task Delete Success",
      position: "top-right",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteTaskAll = () => {
    setTasks([]);

    toast({
      title: "All Task Delete Success",
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const checkTask = (id) => {
    const newTasksCheck = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });
    setTasks(newTasksCheck);
  };

  const updateTask = (id, body, onClose) => {
    const info = body.trim();

    if (!info) {
      toast({
        title: "Enter your task",
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Task Update Success",
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    const newTasksUpdate = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });

    setTasks(newTasksUpdate);

    onClose();
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4} minH="100vh" pb={28}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
        aria-label="toogle-dark-mode"
      />

      <Heading
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-r, red.500, yellow.500)"
        bgClip="text"
      >
        Todo list
      </Heading>
      <AddTask addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
        checkTask={checkTask}
      />
    </VStack>
  );
};

export default App;
