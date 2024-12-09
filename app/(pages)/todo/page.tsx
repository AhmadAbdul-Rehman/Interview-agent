"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
    Edit,
    Ellipsis,
    Trash,
    CircleCheck,
    Timer,
    ArrowLeft,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [taskInput, setTaskInput] = useState(""); // Shared input for adding and editing
    const [editingId, setEditingId] = useState<number | null>(null); // ID of the task being edited

    // Fetch todos
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todos");
        const data = await response.json();
        setTodos(data);
    };

    // Add or update a task
    const handleTaskSubmit = async () => {
        if (!taskInput.trim()) return toast.error("Task cannot be empty");

        if (editingId !== null) {
            // Update task logic
            const response = await fetch(
                `http://localhost:8000/todos/${editingId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: editingId,
                        title: taskInput,
                        completed: false,
                    }),
                }
            );
            if (response.ok) {
                toast.success("Task updated successfully!");
                setEditingId(null);
                setTaskInput("");
                fetchTodos();
            }
        } else {
            // Add new task logic
            const newTodo = {
                id: Date.now(),
                title: taskInput,
                completed: false,
            };
            const response = await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            });
            if (response.ok) {
                toast.success("Task added successfully!");
                setTaskInput("");
                fetchTodos();
            }
        }
    };

    // Handle Enter key for submission
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleTaskSubmit();
        }
    };

    // Delete a todo
    const deleteTodo = async (id: number) => {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            toast.success("Task deleted successfully!");
            fetchTodos();
        }
    };

    // Toggle task completion
    const toggleTodo = async (id: number, completed: boolean) => {
        const todoToUpdate = todos.find((todo: any) => todo.id === id);
        if (!todoToUpdate) return;
        const updatedTodo = { ...todoToUpdate, completed };
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTodo),
        });
        if (response.ok) {
            toast.success("Task status updated!");
            fetchTodos();
        }
    };

    // Set task to edit
    const startEditing = (id: number, title: string) => {
        setEditingId(id);
        setTaskInput(title);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="h-screen">
            <div className="h-14 px-4 flex items-center">
                <Link href="/">
                    <div className="size-8 flex items-center cursor-pointer justify-center text-white rounded-full bg-zinc-950">
                        <ArrowLeft />
                    </div>
                </Link>
            </div>
            <main className="h-[calc(100vh-56px)] w-4/5 mx-auto">
                <h1 className="font-mono mb-3 text-xl">Welcome to FastAPI TODO App</h1>
                <div className="flex items-center gap-3 mb-5">
                    <Input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your task"
                    />
                    <Button onClick={handleTaskSubmit}>
                        {editingId !== null ? "Update Task" : "Add Task"}
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-white bg-white">
                            <TableCell>Task</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo: any) => (
                            <TableRow
                                key={todo.id}
                                className={`${
                                    todo.completed ? "bg-[#F9F9FA]" : "bg-white"
                                }`}
                            >
                                <TableCell className="font-medium">
                                    <Checkbox
                                        checked={todo.completed}
                                        onCheckedChange={() =>
                                            toggleTodo(todo.id, !todo.completed)
                                        }
                                    />
                                    <span className="ml-2">{todo.title}</span>
                                </TableCell>
                                <TableCell>
                                    {todo.completed ? (
                                        <p className="text-green-500 inline-flex items-center gap-2">
                                            <CircleCheck /> Done
                                        </p>
                                    ) : (
                                        <p className="text-yellow-500 inline-flex items-center gap-2">
                                            <Timer /> Pending
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                <Ellipsis />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    startEditing(
                                                        todo.id,
                                                        todo.title
                                                    )
                                                }
                                            >
                                                <Edit /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    deleteTodo(todo.id)
                                                }
                                            >
                                                <Trash /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    );
}
