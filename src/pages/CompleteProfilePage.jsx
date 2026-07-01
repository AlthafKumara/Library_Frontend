import { useCompleteProfile } from "../hooks/useCompleteProfile";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Plus, User } from "@phosphor-icons/react";

export default function CompleteProfilePage() {
  const {
    name,
    gender,
    photoPreview,
    errors,
    loading,
    serverError,
    handleAvatarClick,
    handlePhotoChange,
    onNameChange,
    onGenderChange,
    handleSubmit,
    fileInputRef,
  } = useCompleteProfile();

  return (
    <div className="min-h-dvh bg-neutral-50 flex items-center justify-center p-4 py-6 md:py-12">
      <div className="w-full max-w-lg">
        {/* Header section outside the card */}
        <div className="mb-8 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-none mb-4">
            Complete Your Profile
          </h1>
          <p className="text-neutral-500 text-lg max-w-[65ch] mx-auto leading-relaxed">
            Let's get to know you better. Please fill in your details to continue.
          </p>
        </div>

        {/* Bento Card */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-200">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div
                onClick={handleAvatarClick}
                className={`
                  relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
                  transition-all duration-200 ease-out active:scale-95 group
                  ${photoPreview ? 'border-4 border-primary-100 shadow-sm' : 'border-2 border-dashed border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50'}
                `}
                title="Click to upload a profile photo"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Selected profile photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-neutral-400 group-hover:text-primary-500 transition-colors" weight="regular" />
                )}
                
                {/* Overlay for hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Plus className="w-6 h-6 text-white" weight="bold" />
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-900">Profile Photo <span className="text-neutral-400 font-normal">(Optional)</span></p>
                {errors.photo && (
                  <p className="text-sm text-danger-500 mt-1 leading-none">{errors.photo}</p>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-neutral-200" />

            {/* Inputs */}
            <div className="flex flex-col gap-6">
              <Input
                label="Full Name *"
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={onNameChange}
                placeholder="Enter your full name"
                disabled={loading}
                error={errors.name}
              />

              {/* Gender Select mimicking Input style */}
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="gender"
                  className="text-sm font-medium text-neutral-900 leading-none"
                >
                  Gender *
                </label> <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={onGenderChange}
                    disabled={loading}
                    className={`
                      appearance-none flex h-12 w-full rounded-xl px-4 py-2
                      bg-neutral-100 text-neutral-900 border border-neutral-300
                      focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                      text-base leading-normal transition-colors duration-150 ease-out
                      disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300
                      ${errors.gender ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20' : ''}
                      ${!gender ? 'text-neutral-400' : ''}
                    `}
                  >
                    <option value="" disabled hidden>-- Select gender --</option>
                    <option value="Male" className="text-neutral-900">Male</option>
                    <option value="Female" className="text-neutral-900">Female</option>
                  </select>
                  {/* Custom select arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.gender && (
                  <span className="text-sm text-danger-500 leading-none">{errors.gender}</span>
                )}
              </div>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-xl text-sm text-danger-600 text-center font-medium">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <Button type="submit" className="w-full" size="lg" disabled={loading} variant="primary">
                {loading ? "Saving Profile..." : "Complete Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}