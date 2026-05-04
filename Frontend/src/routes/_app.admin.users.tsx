import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Trash2, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth-context";
import { deleteUser, listUsers } from "@/services/auth-api";
import type { AuthUser } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/admin/users")({
  head: () => ({ meta: [{ title: "User Management · FaceGate" }] }),
  component: UsersPage,
});

function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    listUsers()
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteUser(id);
      toast.success(`Deleted ${name}`);
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">Access denied</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Administration · Users
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">User Management</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm">
          <UsersIcon className="h-4 w-4 text-primary" />
          <span className="font-mono">{users.length} enrolled</span>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card/60">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading users…
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No users enrolled yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/30">
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    {u.role === "admin" ? (
                      <Badge className="bg-accent/15 text-accent ring-1 ring-accent/30 hover:bg-accent/15">
                        ADMIN
                      </Badge>
                    ) : (
                      <Badge variant="secondary">USER</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={u.id === user?.id}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {u.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will revoke their access and remove their face
                            encoding from the database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(u.id, u.name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
