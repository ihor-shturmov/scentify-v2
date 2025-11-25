import { Router, Request, Response } from 'express';
import Perfume from '../models/perfume.model';

const router = Router();

// GET /api/perfumes - Get all perfumes with optional filters
router.get('/', async (req: Request, res: Response) => {
    try {
        const { scentFamily, gender, minPrice, maxPrice, search, sort = '-createdAt', limit = 50 } = req.query;

        const query: any = {};

        // Filters
        if (scentFamily) query.scentFamily = scentFamily;
        if (gender) query.gender = gender;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$text = { $search: search as string };
        }

        const perfumes = await Perfume.find(query)
            .sort(sort as string)
            .limit(Number(limit));

        res.json({
            success: true,
            count: perfumes.length,
            data: perfumes
        });
    } catch (error) {
        console.error('Error fetching perfumes:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch perfumes'
        });
    }
});

// GET /api/perfumes/:id - Get single perfume
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const perfume = await Perfume.findById(req.params.id);

        if (!perfume) {
            return res.status(404).json({
                success: false,
                error: 'Perfume not found'
            });
        }

        return res.json({
            success: true,
            data: perfume
        });
    } catch (error) {
        console.error('Error fetching perfume:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch perfume'
        });
    }
});

// POST /api/perfumes - Create new perfume (admin only - TODO: add auth middleware)
router.post('/', async (req: Request, res: Response) => {
    try {
        const perfume = new Perfume(req.body);
        await perfume.save();

        res.status(201).json({
            success: true,
            data: perfume
        });
    } catch (error) {
        console.error('Error creating perfume:', error);
        res.status(400).json({
            success: false,
            error: 'Failed to create perfume'
        });
    }
});

// PUT /api/perfumes/:id - Update perfume (admin only - TODO: add auth middleware)
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const perfume = await Perfume.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!perfume) {
            return res.status(404).json({
                success: false,
                error: 'Perfume not found'
            });
        }

        return res.json({
            success: true,
            data: perfume
        });
    } catch (error) {
        console.error('Error updating perfume:', error);
        return res.status(400).json({
            success: false,
            error: 'Failed to update perfume'
        });
    }
});

// DELETE /api/perfumes/:id - Delete perfume (admin only - TODO: add auth middleware)
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const perfume = await Perfume.findByIdAndDelete(req.params.id);

        if (!perfume) {
            return res.status(404).json({
                success: false,
                error: 'Perfume not found'
            });
        }

        return res.json({
            success: true,
            message: 'Perfume deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting perfume:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to delete perfume'
        });
    }
});

export default router;
