"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Switch } from "~/components/ui/switch";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "~/components/ui/modal";
import { addServiceAction, updateServiceAction, deleteServiceAction } from "../actions";

interface Service {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  category: string | null;
  price: string;
  durationMinutes: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ServicesClientProps {
  initialServices: Service[];
}

export function ServicesClient({ initialServices }: ServicesClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(30);
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Filtered services
  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      service.name.toLowerCase().includes(query) ||
      (service.description?.toLowerCase() || "").includes(query) ||
      (service.category?.toLowerCase() || "").includes(query)
    );
  });

  const handleOpenAdd = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDuration(30);
    setCategory("");
    setIsActive(true);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description || "");
    setPrice(service.price);
    setDuration(service.durationMinutes);
    setCategory(service.category || "");
    setIsActive(service.isActive);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !duration) return;
    setLoading(true);
    try {
      const newService = await addServiceAction({
        name,
        description,
        price,
        durationMinutes: duration,
        category,
        isActive,
      });
      if (newService) {
        setServices([newService as Service, ...services]);
        setIsAddOpen(false);
      }
    } catch (err) {
      console.error("Error adding service:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !name || !price || !duration) return;
    setLoading(true);
    try {
      const updated = await updateServiceAction(selectedService.id, {
        name,
        description,
        price,
        durationMinutes: duration,
        category,
        isActive,
      });
      if (updated) {
        setServices(
          services.map((s) => (s.id === selectedService.id ? (updated as Service) : s))
        );
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Error updating service:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;
    setLoading(true);
    try {
      await deleteServiceAction(selectedService.id);
      setServices(services.filter((s) => s.id !== selectedService.id));
      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Error deleting service:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const updated = await updateServiceAction(service.id, {
        name: service.name,
        description: service.description || undefined,
        price: service.price,
        durationMinutes: service.durationMinutes,
        category: service.category || undefined,
        isActive: !service.isActive,
      });
      if (updated) {
        setServices(services.map((s) => (s.id === service.id ? (updated as Service) : s)));
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your service catalog, duration, category and pricing.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="sm:self-start">
          <Plus className="size-4 mr-1.5" /> Add Service
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search services by name, description, or category..."
          className="pl-9 w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid List of Services */}
      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
              <Search className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No services found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              {searchQuery ? "No services match your search query." : "Add your first service to begin configuring your shop's offerings."}
            </p>
            {!searchQuery && (
              <Button onClick={handleOpenAdd} className="mt-4">
                <Plus className="size-4 mr-1.5" /> Add Service
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="relative flex flex-col justify-between overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold line-clamp-1">{service.name}</CardTitle>
                    {service.category && (
                      <Badge variant="outline" className="text-xs">
                        {service.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title={service.isActive ? "Set inactive" : "Set active"}
                    >
                      {service.isActive ? (
                        <ToggleRight className="size-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="size-6" />
                      )}
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 h-10 mb-4">
                  {service.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-sm">
                  <div>
                    <span className="text-gray-400">Duration</span>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{service.durationMinutes} mins</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400">Price</span>
                    <p className="font-bold text-gray-900 dark:text-white text-base">${parseFloat(service.price).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/10 px-4 py-2">
                <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(service)} className="text-gray-600 dark:text-gray-300">
                  <Edit2 className="size-3.5 mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleOpenDelete(service)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
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
            <ModalTitle>Add Service</ModalTitle>
            <ModalDescription>Create a new service in your catalog.</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleAddService} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Name *</label>
              <Input
                required
                placeholder="e.g. Skin Fade"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <Input
                placeholder="e.g. Haircut, Shave, Coloring"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price ($) *</label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="35.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration (mins) *</label>
                <Input
                  required
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea
                placeholder="Describe the service details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="add-active" />
              <label htmlFor="add-active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Available for booking / AI recommendation
              </label>
            </div>
            <ModalFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Create Service
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onOpenChange={setIsEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Service</ModalTitle>
            <ModalDescription>Update service specifications and pricing.</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleUpdateService} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Name *</label>
              <Input
                required
                placeholder="e.g. Skin Fade"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <Input
                placeholder="e.g. Haircut, Shave, Coloring"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price ($) *</label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="35.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration (mins) *</label>
                <Input
                  required
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea
                placeholder="Describe the service details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="edit-active" />
              <label htmlFor="edit-active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Available for booking / AI recommendation
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
            <ModalTitle>Delete Service</ModalTitle>
            <ModalDescription>Are you absolutely sure you want to delete this service?</ModalDescription>
          </ModalHeader>
          <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
            This will permanently remove <span className="font-semibold text-gray-900 dark:text-white">{selectedService?.name}</span> from your catalog. This action cannot be undone.
          </div>
          <ModalFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteService} disabled={loading}>
              {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Delete Service
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
