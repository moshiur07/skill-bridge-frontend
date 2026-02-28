// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

// const IdentityCard = () => {
//     return (
//         <div>
//              <Card className="shadow-xl">
//         <CardContent className="pt-5 pb-5">
//           <div className="flex items-center gap-4 flex-wrap">
//             <Avatar className="w-14 h-14 shrink-0">
//               <AvatarImage
//                 src={imageUrl || undefined}
//                 alt={profile.user?.name}
//               />
//               <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary">
//                 {initials(profile.user?.name ?? "T")}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 min-w-0">
//               <div className="flex flex-wrap items-center gap-2 mb-1">
//                 <p className="font-semibold text-lg">{profile.user?.name}</p>

//                 {/* Featured badge — read only, admin controlled */}
//                 {profile.isFeatured ? (
//                   <Badge className="gap-1 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
//                     <ShieldCheck className="w-3 h-3" />
//                     Featured
//                   </Badge>
//                 ) : (
//                   <Badge
//                     variant="outline"
//                     className="gap-1 text-muted-foreground text-xs"
//                   >
//                     Not featured
//                   </Badge>
//                 )}
//               </div>
//               <p className="text-sm text-muted-foreground">
//                 {profile.user?.email}
//               </p>
//               <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
//                 <span className="flex items-center gap-1">
//                   <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//                   {profile.rating_average?.toFixed(1) ?? "0.0"} rating
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <DollarSign className="w-3.5 h-3.5" />${profile.hourly_rate}
//                   /hr current rate
//                 </span>
//               </div>
//             </div>

//             <p className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-md w-full sm:w-auto text-center">
//               Featured status is managed by admins
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//         </div>
//     );
// };

// export default IdentityCard;
