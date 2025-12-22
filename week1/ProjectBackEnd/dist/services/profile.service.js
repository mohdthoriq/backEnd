export class ProfileService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    async create(data) {
        const exist = await this.profileRepo.findUserById(data.userId);
        if (exist)
            throw new Error("Profile sudah ada");
        return this.profileRepo.create(data);
    }
    async getById(id) {
        const profile = await this.profileRepo.findProfileById(id);
        if (!profile)
            throw new Error("Profile tidak ditemukan");
        return profile;
    }
    async update(id, data) {
        await this.getById(id);
        return this.profileRepo.update(id, data);
    }
    async delete(id) {
        await this.getById(id);
        await this.profileRepo.remove(id);
    }
}
//# sourceMappingURL=profile.service.js.map