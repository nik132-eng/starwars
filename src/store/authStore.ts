import { create } from 'zustand';

export interface PDF {
  id: string;
  title: string;
  fileUrl: string;
  upvotes: number;
  downvotes: number;
}

interface Comment {
  id: string; 
  userId: string;
  text: string; 
}

interface StoreState {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  pdfs: PDF[];
  setPDFs: (pdfs: PDF[]) => void;
  addPDF: (pdf: PDF) => void;
  updatePDF: (id: string, updates: Partial<PDF>) => void;

  votePDF: (id: string, userId: string, voteType: 'up' | 'down') => void; 
  addComment: (pdfId: string, userId: string, text: string) => void; 

  comments: Record<string, Comment[]>; 

  loading: boolean; 
  error: string | null; 
  fetchPDFs: () => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  selectedCategory: 'vehicles',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  pdfs: [],
  setPDFs: (pdfs) => set({ pdfs }),
  addPDF: (pdf) => set((state) => ({ pdfs: [...state.pdfs, pdf] })),

  updatePDF: (id, updates) => set((state) => ({
    pdfs: state.pdfs.map((pdf) => pdf.id === id ? { ...pdf, ...updates } : pdf)
  })),

  votePDF: (id, userId, voteType) => set((state) => ({
    pdfs: state.pdfs.map((pdf) =>
      pdf.id === id
        ? {
            ...pdf,
            upvotes: voteType === 'up' ? pdf.upvotes + 1 : pdf.upvotes,
            downvotes: voteType === 'down' ? pdf.downvotes + 1 : pdf.downvotes
          }
        : pdf
    )
  })),

  comments: {}, 

  addComment: (pdfId, userId, text) => set((state) => {
    const newComment = { id: `${userId}-${Date.now()}`, userId, text }; 
    return {
      comments: {
        ...state.comments,
        [pdfId]: [...(state.comments[pdfId] || []), newComment] 
      }
    };
  }),

  loading: false, 
  error: null, 

  fetchPDFs: async () => {
    set({ loading: true, error: null }); 
    try {
      const response = await fetch('../api/pdfs'); 
      const data = await response.json();
      set({ pdfs: data, loading: false }); 
    } catch (err) {
      set({ error: 'Failed to fetch PDFs', loading: false });
    }
  },
}));

export default useStore;