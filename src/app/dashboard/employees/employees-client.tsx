"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, ToggleLeft, ToggleRight, Loader2, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Switch } from "~/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "~/components/ui/modal";
import { addEmployeeAction, updateEmployeeAction, deleteEmployeeAction } from "../actions";

interface Employee {
  id: string;
  organizationId: string;
  name: string;
  title: string | null;
  bio: string | null;
  photoUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface EmployeesClientProps {
  initialEmployees: Employee[];
}

export function EmployeesClient({ initialEmployees }: EmployeesClientProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Filtered employees
  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      (employee.title?.toLowerCase() || "").includes(query) ||
      (employee.bio?.toLowerCase() || "").includes(query)
    );
  });

  const handleOpenAdd = () => {
    setName("");
    setTitle("");
    setBio("");
    setPhotoUrl("");
    setIsActive(true);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setName(employee.name);
    setTitle(employee.title || "");
    setBio(employee.bio || "");
    setPhotoUrl(employee.photoUrl || "");
    setIsActive(employee.isActive);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteOpen(true);
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    try {
      const newEmployee = await addEmployeeAction({
        name,
        title,
        bio,
        photoUrl,
        isActive,
      });
      if (newEmployee) {
        setEmployees([newEmployee as Employee, ...employees]);
        setIsAddOpen(false);
      }
    } catch (err) {
      console.error("Error adding employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !name) return;
    setLoading(true);
    try {
      const updated = await updateEmployeeAction(selectedEmployee.id, {
        name,
        title,
        bio,
        photoUrl,
        isActive,
      });
      if (updated) {
        setEmployees(
          employees.map((e) => (e.id === selectedEmployee.id ? (updated as Employee) : e))
        );
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Error updating employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;
    setLoading(true);
    try {
      await deleteEmployeeAction(selectedEmployee.id);
      setEmployees(employees.filter((e) => e.id !== selectedEmployee.id));
      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Error deleting employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (employee: Employee) => {
    try {
      const updated = await updateEmployeeAction(employee.id, {
        name: employee.name,
        title: employee.title || undefined,
        bio: employee.bio || undefined,
        photoUrl: employee.photoUrl || undefined,
        isActive: !employee.isActive,
      });
      if (updated) {
        setEmployees(employees.map((e) => (e.id === employee.id ? (updated as Employee) : e)));
      }
    } catch (err) {
      console.error("Error toggling active state:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your professional team, titles, bios, and schedules.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="sm:self-start">
          <Plus className="size-4 mr-1.5" /> Add Staff Member
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search team by name, role, or bio..."
          className="pl-9 w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid List of Employees */}
      {filteredEmployees.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
              <User className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No team members found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              {searchQuery ? "No staff members match your search query." : "Add your first team member to begin scheduling appointments."}
            </p>
            {!searchQuery && (
              <Button onClick={handleOpenAdd} className="mt-4">
                <Plus className="size-4 mr-1.5" /> Add Staff Member
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="relative flex flex-col justify-between overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border border-gray-100 dark:border-gray-800">
                      <AvatarImage src={employee.photoUrl || undefined} alt={employee.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium">
                        {employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold line-clamp-1">{employee.name}</CardTitle>
                      {employee.title && (
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                          {employee.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                    <button
                      onClick={() => handleToggleActive(employee)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title={employee.isActive ? "Set inactive" : "Set active"}
                    >
                      {employee.isActive ? (
                        <ToggleRight className="size-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="size-6" />
                      )}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 h-14 mb-2">
                  {employee.bio || "No professional bio provided."}
                </p>
                <div className="pt-2">
                  <Badge variant={employee.isActive ? "success" : "secondary"} className="text-xs">
                    {employee.isActive ? "Active / Booking Live" : "Inactive / Away"}
                  </Badge>
                </div>
              </CardContent>
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/10 px-4 py-2">
                <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(employee)} className="text-gray-600 dark:text-gray-300">
                  <Edit2 className="size-3.5 mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleOpenDelete(employee)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <Trash2 className="size-3.5 mr-1" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal open={isAddOpen} onOpenChange={setIsAddOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Team Member</ModalTitle>
            <ModalDescription>Configure profile and booking status for new staff.</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleAddEmployee} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
              <Input
                required
                placeholder="e.g. Marcus Aurelius"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title / Role</label>
              <Input
                placeholder="e.g. Master Barber, Hair Color Specialist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
              <Input
                placeholder="e.g. https://images.unsplash.com/photo-..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Bio</label>
              <Textarea
                placeholder="Introduce this team member to your customers..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="add-active" />
              <label htmlFor="add-active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Available for booking with clients
              </label>
            </div>
            <ModalFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Create Profile
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onOpenChange={setIsEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Team Member</ModalTitle>
            <ModalDescription>Update profile details, bio, photo and active status.</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleUpdateEmployee} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
              <Input
                required
                placeholder="e.g. Marcus Aurelius"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title / Role</label>
              <Input
                placeholder="e.g. Master Barber, Hair Color Specialist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
              <Input
                placeholder="e.g. https://images.unsplash.com/photo-..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Bio</label>
              <Textarea
                placeholder="Introduce this team member to your customers..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="edit-active" />
              <label htmlFor="edit-active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Available for booking with clients
              </label>
            </div>
            <ModalFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Remove Staff Profile</ModalTitle>
            <ModalDescription>Are you absolutely sure you want to remove this profile?</ModalDescription>
          </ModalHeader>
          <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
            This will permanently delete the staff member profile for <span className="font-semibold text-gray-900 dark:text-white">{selectedEmployee?.name}</span>. This action cannot be undone.
          </div>
          <ModalFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteEmployee} disabled={loading}>
              {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Delete Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
