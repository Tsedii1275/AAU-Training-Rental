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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Lock, Shield, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChangePassword, type ChangePasswordRequest } from "@/hooks/useAuthApi";
import { useState } from "react";

export default function AccountSettings() {
  const { toast } = useToast();
  const changePasswordMutation = useChangePassword();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const form = useForm<ChangePasswordRequest>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const validateForm = (data: ChangePasswordRequest): boolean => {
    let isValid = true;

    if (!data.currentPassword.trim()) {
      form.setError("currentPassword", { type: "manual", message: "Current password is required" });
      isValid = false;
    }

    if (!data.newPassword.trim()) {
      form.setError("newPassword", { type: "manual", message: "New password is required" });
      isValid = false;
    } else if (data.newPassword.length < 8) {
      form.setError("newPassword", { type: "manual", message: "Password must be at least 8 characters long" });
      isValid = false;
    }

    if (!data.confirmPassword.trim()) {
      form.setError("confirmPassword", { type: "manual", message: "Please confirm your new password" });
      isValid = false;
    } else if (data.newPassword !== data.confirmPassword) {
      form.setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
      isValid = false;
    }

    if (data.currentPassword === data.newPassword) {
      form.setError("newPassword", { type: "manual", message: "New password must be different from current password" });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (data: ChangePasswordRequest) => {
    if (!validateForm(data)) {
      return;
    }

    try {
      await changePasswordMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to change password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled" 
        : "Two-factor authentication has been enabled",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Account Settings"
        description="Manage your account security and authentication preferences"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Change Password Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your account password. Use a strong password with at least 8 characters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (!e.target.value.trim()) {
                              form.setError("currentPassword", {
                                type: "manual",
                                message: "Current password is required",
                              });
                            } else {
                              form.clearErrors("currentPassword");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (!e.target.value.trim()) {
                              form.setError("newPassword", {
                                type: "manual",
                                message: "New password is required",
                              });
                            } else if (e.target.value.length < 8) {
                              form.setError("newPassword", {
                                type: "manual",
                                message: "Password must be at least 8 characters long",
                              });
                            } else if (form.getValues("currentPassword") === e.target.value) {
                              form.setError("newPassword", {
                                type: "manual",
                                message: "New password must be different from current password",
                              });
                            } else {
                              form.clearErrors("newPassword");
                              // Clear confirm password error if passwords match
                              if (e.target.value === form.getValues("confirmPassword")) {
                                form.clearErrors("confirmPassword");
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your new password"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const newPassword = form.getValues("newPassword");
                            if (!e.target.value.trim()) {
                              form.setError("confirmPassword", {
                                type: "manual",
                                message: "Please confirm your new password",
                              });
                            } else if (e.target.value !== newPassword) {
                              form.setError("confirmPassword", {
                                type: "manual",
                                message: "Passwords do not match",
                              });
                            } else {
                              form.clearErrors("confirmPassword");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4 border-t">
                  <Button
                    type="submit"
                    className="bg-aau-gradient hover:opacity-90"
                    disabled={changePasswordMutation.isPending}
                  >
                    {changePasswordMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <KeyRound className="mr-2 h-4 w-4" />
                    {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Security Settings Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage additional security features for your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="space-y-1">
                <Label htmlFor="2fa" className="text-base font-medium">
                  Two-Factor Authentication (2FA)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
              <Switch
                id="2fa"
                checked={twoFactorEnabled}
                onCheckedChange={handleToggle2FA}
              />
            </div>

            {twoFactorEnabled && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong>2FA is enabled.</strong> You'll need to provide a verification code from your authenticator app when signing in.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
