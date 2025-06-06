"use client";

import { useState } from "react";
import { Save, RefreshCcw, Film, Tv, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { websiteSettings } from "@/lib/mock/data";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    title: websiteSettings.title,
    description: websiteSettings.description,
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    domain: "stream-flix.com",
    defaultLanguage: "en",

    // Content settings
    allowUserUploads: false,
    requireEmailVerification: true,
    showAdultContent: false,
    enableComments: true,

    // Email settings
    emailProvider: "smtp",
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "admin@example.com",
    smtpPass: "********",
    senderEmail: "no-reply@stream-flix.com",

    // Storage settings
    storageProvider: "local",
    maxFileSize: "2GB",
    allowedFileTypes: "mp4,webm,mkv",

    // Social media
    twitterHandle: "@streamflix",
    facebookPage: "streamflix",
    instagramHandle: "streamflix",
  });

  // Mock function to update settings
  const handleSettingChange = (
    section: string,
    field: string,
    value: string,
  ) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  // Mock function for form submission
  const handleSaveSettings = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would save to the database
    console.log("Settings saved:", settings);

    // Mock success message
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your streaming platform settings
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        orientation="horizontal"
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="content">
            <Film className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Tv className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your website&apos;s basic information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Website Title</Label>
                      <Input
                        id="title"
                        placeholder="Your website title"
                        value={settings.title}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="domain">Domain Name</Label>
                      <Input
                        id="domain"
                        placeholder="yourdomain.com"
                        value={settings.domain}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "domain",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Website Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your website"
                      value={settings.description}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "description",
                          e.target.value,
                        )
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo URL</Label>
                      <Input
                        id="logo"
                        placeholder="/logo.svg"
                        value={settings.logo}
                        onChange={(e) =>
                          handleSettingChange("general", "logo", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="favicon">Favicon URL</Label>
                      <Input
                        id="favicon"
                        placeholder="/favicon.ico"
                        value={settings.favicon}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "favicon",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select
                      value={settings.defaultLanguage}
                      onValueChange={(value) =>
                        handleSettingChange("general", "defaultLanguage", value)
                      }
                    >
                      <SelectTrigger id="defaultLanguage">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="jp">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Configure content display and upload options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-border flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableComments">Enable Comments</Label>
                    <p className="text-muted-foreground text-sm">
                      Allow users to comment on videos
                    </p>
                  </div>
                  <Switch
                    id="enableComments"
                    checked={settings.enableComments}
                    onCheckedChange={(checked) =>
                      handleSettingChange("content", "enableComments", checked)
                    }
                  />
                </div>
                <div className="border-border flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowUserUploads">Allow User Uploads</Label>
                    <p className="text-muted-foreground text-sm">
                      Let users upload their own content
                    </p>
                  </div>
                  <Switch
                    id="allowUserUploads"
                    checked={settings.allowUserUploads}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "content",
                        "allowUserUploads",
                        checked,
                      )
                    }
                  />
                </div>
                <div className="border-border flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="showAdultContent">
                      Allow Adult Content
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Show adult content with age verification
                    </p>
                  </div>
                  <Switch
                    id="showAdultContent"
                    checked={settings.showAdultContent}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "content",
                        "showAdultContent",
                        checked,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                <Input
                  id="allowedFileTypes"
                  placeholder="mp4,webm,mkv"
                  value={settings.allowedFileTypes}
                  onChange={(e) =>
                    handleSettingChange(
                      "content",
                      "allowedFileTypes",
                      e.target.value,
                    )
                  }
                />
                <p className="text-muted-foreground text-xs">
                  Comma-separated list of allowed file extensions
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>Configure user account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border-border flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">
                      Require Email Verification
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Users must verify their email before accessing content
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "users",
                        "requireEmailVerification",
                        checked,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Registration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Open" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open to All</SelectItem>
                      <SelectItem value="invite">Invite Only</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default User Role</Label>
                  <Select defaultValue="subscriber">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscriber">Subscriber</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure technical settings for your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storageProvider">Storage Provider</Label>
                  <Select
                    value={settings.storageProvider}
                    onValueChange={(value) =>
                      handleSettingChange("advanced", "storageProvider", value)
                    }
                  >
                    <SelectTrigger id="storageProvider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                      <SelectItem value="azure">Azure Blob Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size</Label>
                  <Input
                    id="maxFileSize"
                    placeholder="2GB"
                    value={settings.maxFileSize}
                    onChange={(e) =>
                      handleSettingChange(
                        "advanced",
                        "maxFileSize",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Settings</Label>
                <Card className="border-border">
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="emailProvider">Email Provider</Label>
                        <Select
                          value={settings.emailProvider}
                          onValueChange={(value) =>
                            handleSettingChange(
                              "advanced",
                              "emailProvider",
                              value,
                            )
                          }
                        >
                          <SelectTrigger id="emailProvider">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smtp">SMTP</SelectItem>
                            <SelectItem value="mailgun">Mailgun</SelectItem>
                            <SelectItem value="ses">Amazon SES</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Sender Email</Label>
                        <Input
                          id="senderEmail"
                          placeholder="no-reply@example.com"
                          value={settings.senderEmail}
                          onChange={(e) =>
                            handleSettingChange(
                              "advanced",
                              "senderEmail",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    {settings.emailProvider === "smtp" && (
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="smtpHost">SMTP Host</Label>
                            <Input
                              id="smtpHost"
                              placeholder="smtp.example.com"
                              value={settings.smtpHost}
                              onChange={(e) =>
                                handleSettingChange(
                                  "advanced",
                                  "smtpHost",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtpPort">SMTP Port</Label>
                            <Input
                              id="smtpPort"
                              placeholder="587"
                              value={settings.smtpPort}
                              onChange={(e) =>
                                handleSettingChange(
                                  "advanced",
                                  "smtpPort",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="smtpUser">SMTP Username</Label>
                            <Input
                              id="smtpUser"
                              placeholder="username"
                              value={settings.smtpUser}
                              onChange={(e) =>
                                handleSettingChange(
                                  "advanced",
                                  "smtpUser",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtpPass">SMTP Password</Label>
                            <Input
                              id="smtpPass"
                              type="password"
                              placeholder="********"
                              value={settings.smtpPass}
                              onChange={(e) =>
                                handleSettingChange(
                                  "advanced",
                                  "smtpPass",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
