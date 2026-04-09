import { Album } from "./album.model";

// CREATE
const createAlbum = async (payload: any) => {
  return await Album.create(payload);
};

// GET ALL (ADMIN)
const getAllAlbums = async () => {
  return await Album.find({ isDeleted: false }).sort({ createdAt: -1 });
};

// GET PUBLISHED (FRONTEND)
const getPublishedAlbums = async () => {
  return await Album.find({
    status: "published",
    isDeleted: false,
  });
};

// GET SINGLE
const getSingleAlbum = async (id: string) => {
  return await Album.findById(id);
};

// UPDATE
const updateAlbum = async (id: string, payload: any) => {
  return await Album.findByIdAndUpdate(id, payload, { new: true });
};

// DELETE
const deleteAlbum = async (id: string) => {
  return await Album.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

// UPDATE STATUS
const updateStatus = async (
  id: string,
  status: "draft" | "published"
) => {
  return await Album.findByIdAndUpdate(id, { status }, { new: true });
};

export const AlbumService = {
  createAlbum,
  getAllAlbums,
  getPublishedAlbums,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
  updateStatus,
};