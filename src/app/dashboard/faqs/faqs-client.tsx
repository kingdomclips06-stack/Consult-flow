"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Loader2, HelpCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "~/components/ui/modal";
import { addFAQAction, updateFAQAction, deleteFAQAction } from "../actions";

interface FAQ {
  id: string;
  organizationId: string;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FAQsClientProps {
  initialFAQs: FAQ[];
}

export function FAQsClient({ initialFAQs }: FAQsClientProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  // Filtered FAQs
  const filteredFAQs = faqs.filter((faq) => {
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      (faq.category?.toLowerCase() || "").includes(query)
    );
  });

  const handleOpenAdd = () => {
    setQuestion("");
    setAnswer("");
    setCategory("");
    setSortOrder(0);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category || "");
    setSortOrder(faq.sortOrder);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setIsDeleteOpen(true);
  };

  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    setLoading(true);
    try {
      const newFAQ = await addFAQAction({
        question,
        answer,
        category,
        sortOrder,
      });
      if (newFAQ) {
        setFaqs([...faqs, newFAQ as FAQ].sort((a, b) => a.sortOrder - b.sortOrder));
        setIsAddOpen(false);
      }
    } catch (err) {
      console.error("Error adding FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFAQ || !question || !answer) return;
    setLoading(true);
    try {
      const updated = await updateFAQAction(selectedFAQ.id, {
        question,
        answer,
        category,
        sortOrder,
      });
      if (updated) {
        setFaqs(
          faqs
            .map((f) => (f.id === selectedFAQ.id ? (updated as FAQ) : f))
            .sort((a, b) => a.sortOrder - b.sortOrder)
        );
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Error updating FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async () => {
    if (!selectedFAQ) return;
    setLoading(true);
    try {
      await deleteFAQAction(selectedFAQ.id);
      setFaqs(faqs.filter((f) => f.id !== selectedFAQ.id));
      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FAQs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Customize the shop-specific facts, policies, and knowledge the AI assistant uses to guide clients.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="sm:self-start">
          <Plus className="size-4 mr-1.5" /> Add FAQ
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search FAQs by question, answer, or category..."
          className="pl-9 w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid List of FAQs */}
      {filteredFAQs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
              <HelpCircle className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No FAQs found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              {searchQuery ? "No FAQs match your search query." : "Add your first FAQ to help the AI consultant answer questions about your shop."}
            </p>
            {!searchQuery && (
              <Button onClick={handleOpenAdd} className="mt-4">
                <Plus className="size-4 mr-1.5" /> Add FAQ
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <CardHeader className="pb-2 border-b border-gray-50 dark:border-gray-900/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Q: {faq.question}
                    </span>
                    <div className="flex items-center gap-2">
                      {faq.category && (
                        <Badge variant="outline" className="text-[10px]">
                          {faq.category}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-[10px]">
                        Priority Order: {faq.sortOrder}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => handleOpenEdit(faq)}>
                      <Edit2 className="size-3.5 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={() => handleOpenDelete(faq)}>
                      <Trash2 className="size-3.5 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3 pb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal open={isAddOpen} onOpenChange={setIsAddOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add FAQ</ModalTitle>
            <ModalDescription>Create a new question and answer pair for the AI consultation assistant.</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleAddFAQ} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Question *</label>
              <Input
                required
                placeholder="e.g. Do you accept walk-ins?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <Input
                  placeholder="e.g. Booking, Pricing, Hours"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort Order / Priority</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Answer *</label>
              <Textarea
                required
                placeholder="e.g. Yes, we do accept walk-ins, but we highly recommend booking online in advance to guarantee your spot."
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <ModalFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Create FAQ
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} onOpenChange={setIsEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit FAQ</ModalTitle>
            <ModalDescription>Update question, answer response, or sorting priority details.</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleUpdateFAQ} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Question *</label>
              <Input
                required
                placeholder="e.g. Do you accept walk-ins?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <Input
                  placeholder="e.g. Booking, Pricing, Hours"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort Order / Priority</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Answer *</label>
              <Textarea
                required
                placeholder="e.g. Yes, we do accept walk-ins, but we highly recommend booking online in advance to guarantee your spot."
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
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
            <ModalTitle>Delete FAQ</ModalTitle>
            <ModalDescription>Are you absolutely sure you want to delete this FAQ?</ModalDescription>
          </ModalHeader>
          <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
            This will permanently remove the FAQ: <span className="font-semibold text-gray-900 dark:text-white">&ldquo;{selectedFAQ?.question}&rdquo;</span> from your database.
          </div>
          <ModalFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteFAQ} disabled={loading}>
              {loading && <Loader2 className="size-4 mr-1.5 animate-spin" />} Delete FAQ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
