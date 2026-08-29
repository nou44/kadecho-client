import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // =====================================================
    // NAME
    // =====================================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // EMAIL
    // =====================================================

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // =====================================================
    // PASSWORD
    // =====================================================

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // =====================================================
    // ROLE
    // =====================================================

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// HASH PASSWORD
// =====================================================

userSchema.pre("save", async function () {
  // Password hasn't changed
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

// =====================================================
// COMPARE PASSWORD
// =====================================================

userSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return bcrypt.compare(
    candidatePassword,
    this.password
  );
};

// =====================================================
// MODEL
// =====================================================

const User = mongoose.model("User", userSchema);

export default User;