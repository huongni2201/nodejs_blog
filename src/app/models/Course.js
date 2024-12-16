const mongoose = require('mongoose');
const slugUpdater = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Course name is required.'],
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v);
                },
                message: (props) => `${props.value} is not a valid image URL!`,
            },
        },
        videoId: {
            type: String,
            required: [true, 'Video ID is required.'],
        },
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        slug: {
            type: String,
            slug: 'name',
            unique: true,
            index: true,
        },
    },
    {
        timestamps: true,
        minimize: false,
    },
);

// Add plugin
mongoose.plugin(slugUpdater);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

// Static method to find a course by slug
Course.statics.findBySlug = function (slug) {
    return this.findOne({ slug });
};

// Static method to list all courses with optional filters
Course.statics.listCourses = function (filters = {}) {
    return this.find(filters).sort({ createdAt: -1 });
};

module.exports = mongoose.model('Course', Course);
