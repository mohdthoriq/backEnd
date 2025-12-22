import { successResponse } from "../utils/response";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    create = async (req, res) => {
        const file = req.file;
        if (!file)
            throw new Error("image is required");
        if (!req.user) {
            throw new Error("Unauthorized");
        }
        const { name, gender, address } = req.body;
        const imageURL = `/public/uploads/${file.filename}`;
        const profile = await this.profileService.create({
            name: String(name),
            gender: String(gender),
            address: String(address),
            profile_picture_url: imageURL,
            userId: req.user.id,
        });
        successResponse(res, "Profile created successfully", profile);
    };
    getById = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            throw new Error("ID tidak valid");
        const profile = await this.profileService.getById(id);
        successResponse(res, "Profile retrieved successfully", profile);
    };
    update = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            throw new Error("ID tidak valid");
        const profile = await this.profileService.update(id, req.body);
        successResponse(res, "Profile updated successfully", profile);
    };
    remove = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id))
            throw new Error("ID tidak valid");
        await this.profileService.delete(id);
        successResponse(res, "Profile deleted successfully", null);
    };
}
//# sourceMappingURL=profile.controller.js.map