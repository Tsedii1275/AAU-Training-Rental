import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Save, RefreshCw, User as UserIcon, Mail, Shield, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile, useUpdateProfile, type UpdateProfileRequest } from "@/hooks/useAuthApi";

export default function MyProfile() {
  const { toast } = useToast();
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<UpdateProfileRequest>({
    defaultValues: {
      name: "",
      department: "",
    },
    mode: "onChange",
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        department: profile.department || "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: UpdateProfileRequest) => {
    if (!data.name.trim()) {
      form.setError("name", { type: "manual", message: "Full name is required" });
      return;
    }

    if (!data.department.trim()) {
      form.setError("department", { type: "manual", message: "Department is required" });
      return;
    }

    try {
      await updateProfileMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="My Profile"
        description="Manage your personal information and account details"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information. Changes will be reflected across the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </label>
                  <Input
                    value={profile?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed. Contact your administrator if you need to update it.
                  </p>
                </div>

                {/* Role (Read-only) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Role
                  </label>
                  <Input
                    value={profile?.role || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your role is assigned by the system administrator.
                  </p>
                </div>

                {/* Full Name (Editable) */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (!e.target.value.trim()) {
                              form.setError("name", {
                                type: "manual",
                                message: "Full name is required",
                              });
                            } else {
                              form.clearErrors("name");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department (Editable) */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        Department *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your department"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (!e.target.value.trim()) {
                              form.setError("department", {
                                type: "manual",
                                message: "Department is required",
                              });
                            } else {
                              form.clearErrors("department");
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Your department or organizational unit within AAU.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (profile) {
                        form.reset({
                          name: profile.name || "",
                          department: profile.department || "",
                        });
                        toast({
                          title: "Form Reset",
                          description: "Changes have been reverted to your current profile data.",
                        });
                      }
                    }}
                    disabled={updateProfileMutation.isPending}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="bg-aau-gradient hover:opacity-90 min-w-[140px]"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
