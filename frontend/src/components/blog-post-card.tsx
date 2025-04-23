"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPostType } from "@/lib/types"
import { motion } from "framer-motion"

interface BlogPostCardProps {
  post: BlogPostType
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="bg-card/50 border border-primary/20 overflow-hidden h-full flex flex-col hover:border-primary transition-colors">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative h-48 w-full">
            <Image
              src={post.coverImage || "/placeholder.svg?height=200&width=400"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="border-primary/50 text-primary">
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            <h3 className="text-xl font-bold">{post.title}</h3>
          </Link>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link href={`/blog/${post.slug}`} className="text-primary font-medium flex items-center gap-1 group">
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
